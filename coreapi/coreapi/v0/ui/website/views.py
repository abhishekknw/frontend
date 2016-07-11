import math, random, string
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from serializers import UIBusinessInfoSerializer, CampaignListSerializer, CampaignInventorySerializer, UIAccountInfoSerializer
from v0.serializers import CampaignSupplierTypesSerializer, SocietyInventoryBookingSerializer, CampaignSerializer, CampaignSocietyMappingSerializer, BusinessInfoSerializer, BusinessAccountContactSerializer, ImageMappingSerializer, InventoryLocationSerializer, AdInventoryLocationMappingSerializer, AdInventoryTypeSerializer, DurationTypeSerializer, PriceMappingDefaultSerializer, PriceMappingSerializer, BannerInventorySerializer, CommunityHallInfoSerializer, DoorToDoorInfoSerializer, LiftDetailsSerializer, NoticeBoardDetailsSerializer, PosterInventorySerializer, SocietyFlatSerializer, StandeeInventorySerializer, SwimmingPoolInfoSerializer, WallInventorySerializer, UserInquirySerializer, CommonAreaDetailsSerializer, ContactDetailsSerializer, EventsSerializer, InventoryInfoSerializer, MailboxInfoSerializer, OperationsInfoSerializer, PoleInventorySerializer, PosterInventoryMappingSerializer, RatioDetailsSerializer, SignupSerializer, StallInventorySerializer, StreetFurnitureSerializer, SupplierInfoSerializer, SportsInfraSerializer, SupplierTypeSocietySerializer, SocietyTowerSerializer, BusinessTypesSerializer, BusinessSubTypesSerializer, AccountInfoSerializer,  CampaignTypeMappingSerializer
from v0.models import CampaignSupplierTypes, SocietyInventoryBooking, CampaignTypeMapping, Campaign, CampaignSocietyMapping, BusinessInfo, \
                    BusinessAccountContact, ImageMapping, InventoryLocation, AdInventoryLocationMapping, AdInventoryType, DurationType, PriceMappingDefault, \
                    PriceMapping, BannerInventory, CommunityHallInfo, DoorToDoorInfo, LiftDetails, NoticeBoardDetails, PosterInventory, SocietyFlat, StandeeInventory, \
                    SwimmingPoolInfo, WallInventory, UserInquiry, CommonAreaDetails, ContactDetails, Events, InventoryInfo, MailboxInfo, OperationsInfo, PoleInventory, \
                    PosterInventoryMapping, RatioDetails, Signup, StallInventory, StreetFurniture, SupplierInfo, SportsInfra, SupplierTypeSociety, SocietyTower, BusinessTypes, \
                    BusinessSubTypes, AccountInfo, InventorySummary, FlatType
from django.db.models import Q, Sum
from django.db import transaction
from rest_framework import status
import json
from django.contrib.contenttypes.models import ContentType
from v0.models import SupplierTypeCorporate, ProposalInfo, ProposalCenterMapping,SpaceMapping , InventoryType, ShortlistedSpaces
from v0.ui.website.serializers import ProposalInfoSerializer, ProposalCenterMappingSerializer, SpaceMappingSerializer , \
        InventoryTypeSerializer, ShortlistedSpacesSerializer, ProposalSocietySerializer, ProposalCorporateSerializer, ProposalCenterMappingSpaceSerializer


# codes for supplier Types  Society -> RS   Corporate -> CP  Gym -> GY   salon -> SA


class getBusinessTypesAPIView(APIView):
    def get(self, request, format=None):
        print "inside get"
        try:
            busTypes = BusinessTypes.objects.all()

            serializer = BusinessTypesSerializer(busTypes, many=True)
            return Response(serializer.data, status=200)
        except :
            return Response(status=404)


class BusinessAPIListView(APIView):
    def get(self, request, format=None):
        try:
            items = BusinessInfo.objects.all()
            serializer = BusinessInfoSerializer(items, many=True)
            return Response(serializer.data, status=200)
        except :
            return Response(status=404)

    #the delete api is not being used
    def delete(self, request, id, format=None):
        try:
            item = SupplierTypeSociety.objects.get(pk=id)
        except SupplierTypeSociety.DoesNotExist:
            return Response(status=404)
        contacts = item.get_contact_list()
        for contact in contacts:
            contact.delete()
        item.delete()
        return Response(status=204)


class getBusinessSubTypesAPIView(APIView):
    def get(self, request, id, format=None):
        try:
            items = BusinessSubTypes.objects.filter(business_type_id=id)
            serializer = BusinessSubTypesSerializer(items, many=True)

            return Response(serializer.data)
        except :
            return Response(status=404)


class BusinessAPIView(APIView):
    def get(self, request, id, format=None):
        try:
            item = BusinessInfo.objects.get(pk=id)
            business_serializer = UIBusinessInfoSerializer(item)
            accounts = AccountInfo.objects.filter(business=item)
            accounts_serializer = UIAccountInfoSerializer(accounts, many=True)
            response = {
                'business' : business_serializer.data,
                'accounts' : accounts_serializer.data
            }
            return Response(response, status=200)
        except BusinessInfo.DoesNotExist:
            return Response(status=404)



    # the delete api is not being used
    def delete(self, request, id, format=None):
        try:
            item = SupplierTypeSociety.objects.get(pk=id)
        except SupplierTypeSociety.DoesNotExist:
            return Response(status=404)
        contacts = item.get_contact_list()
        for contact in contacts:
            contact.delete()
        item.delete()
        return Response(status=204)



class AccountAPIListView(APIView):
    def get(self, request, format=None):
        try:
            items = AccountInfo.objects.all()
            serializer = AccountInfoSerializer(items, many=True)
            return Response(serializer.data, status=200)
        except :
            return Response(status=404)


class AccountAPIView(APIView):
    def get(self, request, id, format=None):
        try:
            account = AccountInfo.objects.get(pk=id)
            serializer1 = UIAccountInfoSerializer(account)
            business = BusinessInfo.objects.get(pk=account.business_id)
            serializer2 = BusinessInfoSerializer(business)
            '''contacts = AccountContact.objects.filter(account=account)
            serializer3 = AccountContactSerializer(contacts, many=True)'''

            serializer = {'account':serializer1.data, 'business':serializer2.data}
            return Response(serializer, status=200)
        except :
            return Response(status=404)


class NewCampaignAPIView(APIView):
    def post(self, request, format=None):

            # print "\n\n\n  Request Data : "
            # print request.data
            # print "\n\n\n"

            current_user = request.user
            business_data = request.data['business']
            error = {}

            # checking if the business with the same name already exists in the database
            # try:
            #     if 'id' not in business_data :
            #         business = BusinessInfo.objects.get(name=business_data['name'])
            #         error['message'] = 'Business with this name already exists'
            #         error = (error)
            #         return Response({'message' : 'Business with this name already exists'}, status = status.HTTP_406_NOT_ACCEPTABLE)
            #     # else:
            #     #     print "\n\nYeyyyy! found id in the business \n\n"
            # except BusinessInfo.DoesNotExist:
            #     pass


            with transaction.atomic():
                if 'business_id' in business_data:

                    business = BusinessInfo.objects.get(pk=business_data['business_id'])
                    serializer = BusinessInfoSerializer(business,data=business_data)
                else:
                    # creating business ID
                    
                    type_name = BusinessTypes.objects.get(id=int(business_data['business_type_id']))
                    sub_type = BusinessSubTypes.objects.get(id=int(business_data['sub_type_id']))
                    business_data['business_id'] = self.generate_business_id(business_name=business_data['name'], \
                        sub_type=sub_type, type_name=type_name)
                    if business_data['business_id'] is None:
                        # if business_id is None --> after 12 attempts couldn't get unique id so return first id in lowercase
                        business_data['business_id'] = self.generate_business_id(business_data['name'],\
                            sub_type=sub_type, type_name=type_name, lower=True)

                    serializer = BusinessInfoSerializer(data=business_data)

                if serializer.is_valid():
                    try:
                        # This will not hit database again cache will be used if else is executed
                        type_name = BusinessTypes.objects.get(id=int(business_data['business_type_id']))
                        sub_type = BusinessSubTypes.objects.get(id=int(business_data['sub_type_id']))
                        business = serializer.save(type_name=type_name, sub_type=sub_type)

                    except ValueError:
                        # error['message'] = "Business Type/SubType Invalid"
                        # error = (error)
                        return Response({'message' : 'Business Type/SubType Invalid'}, \
                                status=status.HTTP_406_NOT_ACCEPTABLE)

                else:
                    return Response(serializer.errors, status=400)


                content_type_business = ContentType.objects.get_for_model(BusinessInfo)
                contact_ids = list(business.contacts.all().values_list('id',flat=True))
                contact_list = []

                for contact in business_data['contacts']:
                    
                    contact['object_id'] = business.business_id
                    contact['content_type'] = content_type_business.id

                    if 'id' in contact:
                        # print "\nInside if 2\n"
                        item = BusinessAccountContact.objects.get(pk=contact['id'])
                        if contact['spoc'] == '':
                            contact['spoc'] = item.spoc
                        contact_ids.remove(item.id)
                        contact_serializer = BusinessAccountContactSerializer(item, data=contact)
                    else:
                        if contact['spoc'] == '':
                            contact['spoc'] = 'false'
                        # print "\nInside else 2\n"
                        contact_serializer = BusinessAccountContactSerializer(data=contact)

                    contact_serializer.is_valid(raise_exception=True)

                    contact = contact_serializer.save()
                    contact_list.append(contact)
                # deleting all contacts whose id not received from the frontend
                BusinessAccountContact.objects.filter(id__in=contact_ids).delete()

                business_serializer = BusinessInfoSerializer(business)
                # contacts = business.contacts.all()
                contacts_serializer = BusinessAccountContactSerializer(contact_list, many=True)

                response = {
                        'business' : business_serializer.data,
                        'contacts' : contacts_serializer.data,
                    }
                
            return Response(response,status=200)


    def generate_business_id(self,business_name,sub_type,type_name,lower=False):
        business_code = create_code(name = business_name)
        business_front = type_name.business_type_code + sub_type.business_sub_type_code
        business_id = business_front + business_code
        if lower:
            return business_id.lower()

        try:
            business = BusinessInfo.objects.get(business_id=business_id)
            # if exception does not occur means conflict
            business_code = create_code(name=business_name, conflict=True)
            business_id = type_name.business_type_code + sub_type.business_sub_type_code + business_code
            business = BusinessInfo.objects.get(business_id=business_id)
            
            # still conflict ---> Generate random 4 uppercase character string
            i = 0  # i keeps track of infinite loop tune it according to the needs
            while(True):
                if i > 10:
                    return None
                business_code = ''.join(random.choice(string.ascii_uppercase ) for _ in range(4))
                business_id = business_front + business_code
                business = BusinessInfo.objects.get(business_id=business_id)
                i += 1

        except BusinessInfo.DoesNotExist:
            return business_id.upper()



def create_code(name, conflict=False):
    name = name.split()
    print name

    if len(name) >= 4:
        code = name[0][0] + name[1][0] + name[2][0] + name[3][0]
    if len(name) == 3:
        if len(name[0]) >= 2:
            code = name[0][:2] + name[1][0] + name[2][0]
        else : 
            code = get_extra_character() + name[0] + name[1][0] + name[2][0]
    elif len(name) == 2:
        if len(name[0]) >= 2 and len(name[1]) >= 2:
            code = name[0][:2] + name[1][:2]
        elif len(name[0]) >= 3:
            code = name[0][:3] + name[1]
        elif len(name[1]) >= 3:
            code = name[0] + name[1][:3]
        elif len(name[0]) >= 2 or len(name[0]) >=2:
            code = get_extra_character() + name[0] + name[1]
        else : 
            code = get_extra_character(size=2) + name[0] + name[1]
    else:
        if len(name[0]) >= 4:
            code = name[0][:4]
        else : 
            size = 4 - len(name[0])
            extra_characters = get_extra_character(size)
            code = extra_characters + name[0]

    # conflict means previous code already present in database
    # so append a extra char in front of existing code and remove last char from it
    if conflict:
        code = get_extra_character() + code[:3] 


    return code.upper()


def get_extra_character(size=1):
    return ''.join(random.choice(string.ascii_uppercase ) for _ in range(size))



class CreateCampaignAPIView(APIView):
    def post(self, request, format=None):
            response = {}
            current_user = request.user
            errro = {}

            # checking if the data received contains name of the account
            try : 
                account_data = request.data['account']
                account_name = account_data['name']
            except KeyError :
                return Response({'message' : 'Appropriate data not provided'} , \
                        status = status.HTTP_406_NOT_ACCEPTABLE)

            with transaction.atomic():
                
                try:
                    business_id = account_data['business_id']
                except KeyError: 
                    return Response({'message' : 'Imporper Business Type Id'}, status = status.HTTP_406_NOT_ACCEPTABLE)

                
                # checking a valid business
                try:
                    business = BusinessInfo.objects.get(business_id=business_id)
                except BusinessInfo.DoesNotExist:
                    return Response({'message' : 'Business Does Not Exist'}, status = status.HTTP_406_NOT_ACCEPTABLE)

                if 'account_id' in account_data:
                    account = AccountInfo.objects.get(pk=account_data['account_id'])
                    serializer = AccountInfoSerializer(account,data=account_data)
                else:
                    account_data['account_id']= self.generate_account_id(account_name=account_data['name'],business_id=business_id)
                    if account_data['account_id'] is None:
                        # if account_id is None --> after 12 attempts couldn't get unique id so return first id in lowercase
                        account_data['account_id'] = self.generate_account_id(account_name=account_data['name'],business_id=business_id, lower=True)
                    serializer = AccountInfoSerializer(data=account_data)

                if serializer.is_valid():
                    account = serializer.save(business=business)
                else:
                    return Response(serializer.errors, status=400)
            
                content_type_account = ContentType.objects.get_for_model(AccountInfo)

                # #here we will start storing contacts
                contact_ids = list(account.contacts.all().values_list('id',flat=True))
                contact_list = []
                
                for contact in account_data['contacts']:
                    contact['object_id'] = account.account_id
                    contact['content_type'] = content_type_account.id

                    if 'id' in contact:
                        item = BusinessAccountContact.objects.get(pk=contact['id'])
                        contact_ids.remove(item.id)
                        if contact['spoc'] == '':
                            contact['spoc'] = item.spoc
                        contact_serializer = BusinessAccountContactSerializer(item, data=contact)
                    else:
                        if contact['spoc'] == '':
                            contact['spoc'] = 'false'
                        contact_serializer = BusinessAccountContactSerializer(data=contact)
                    
                    if contact_serializer.is_valid():
                        contact = contact_serializer.save()
                        contact_list.append(contact)
                    else:
                        return Response(contact_serializer.errors, status=400)

                BusinessAccountContact.objects.filter(id__in=contact_ids).delete()

                # if 'campaign_type' in request.data or 'supplier_type' in request.data:
                #     campaign_data = {'booking_status':'Shortlisted'}
                #     if 'tentative' in request.data:
                #         for key in request.data['tentative']:
                #             campaign_data[key] = request.data['tentative'][key]

                #     campaign_serializer = CampaignSerializer(data=campaign_data)

                #     campaign_serializer.is_valid(raise_exception=True)
                #     campaign_serializer.save(account=account)
                    
                #     campaign = Campaign.objects.get(pk=campaign_serializer.data['id'])

                #     if 'campaign_type' in request.data:
                #         for key, value in request.data['campaign_type'].iteritems():
                #             campaign_type_map = CampaignTypeMapping(campaign=campaign, type=key, sub_type=value)

                #             campaign_type_map.save()

                #     if 'supplier_type' in request.data:
                #         for key, value in request.data['supplier_type'].iteritems():
                #             supplier_type_map = CampaignSupplierTypes(campaign=campaign, supplier_type=key, count=value)
                #             supplier_type_map.save()
                #             response['campaign'] = campaign_serializer.data

                #     # redirecting to societylist page if the campaign info received
                #     return  Response(campaign_serializer.data, status=201)

                
                # sending accounts and related contacts fields to allow updating 
                # account = AccountInfo.objects.get(id=account_id)
                account_serializer = AccountInfoSerializer(account)
                # contacts = account.contacts.all()
                contacts_serializer = BusinessAccountContactSerializer(contact_list, many=True)
                response['account'] = account_serializer.data
                response['contacts'] = contacts_serializer.data
            return Response(response, status=200)


    def generate_account_id(self, account_name, business_id, lower=False):
        business_code = business_id[-4:]
        account_code = create_code(name = account_name)
        account_id = business_code + account_code

        try:
            account = AccountInfo.objects.get(account_id=account_id)
            # if exception does not occur means confict
            account_code = create_code(name = account_name, conflict=True)
            account_id = business_code + account_code
            account = AccountInfo.objects.get(account_id=account_id)

            # still conflict ---> Generate random 4 uppercase character string
            i = 0  # i keeps track of infinite loop tune it according to the needs
            while(True):
                if i > 10:
                    return None
                account_code = ''.join(random.choice(string.ascii_uppercase ) for _ in range(4))
                account_id = business_code + account_code
                account = AccountInfo.objects.get(account_id=account_id)
                i += 1

        except AccountInfo.DoesNotExist:
            return account_id.upper()


class GetAccountProposalsAPIView(APIView):
    def get(self, request, account_id, format=None):
        
        try:
            account = AccountInfo.objects.get(account_id=account_id)
        except AccountInfo.DoesNotExist:
            return Response({'message': 'Invalid Account ID'}, status=406)

        proposals = ProposalInfo.objects.filter(account=account)
        proposal_serializer = ProposalInfoSerializer(proposals, many=True)

        return Response(proposal_serializer.data, status=200)


class CampaignAPIView(APIView):

    def get(self, request, format=None):
        try:
            status = request.query_params.get('status', None)
            if status:
                print status
                items = Campaign.objects.filter(booking_status=status)
            else:
                items = Campaign.objects.all()
            serializer = CampaignListSerializer(items, many=True)
            return Response(serializer.data)
        except :
            return Response(status=404)

    # the delete api is not being used
    def delete(self, request, id, format=None):
        try:
            item = SupplierTypeSociety.objects.get(pk=id)
        except SupplierTypeSociety.DoesNotExist:
            return Response(status=404)
        contacts = item.get_contact_list()
        for contact in contacts:
            contact.delete()
        item.delete()
        return Response(status=204)



class CampaignInventoryAPIView(APIView):

    def get(self, request, id, format=None):
        try:
            campaign = Campaign.objects.get(pk=id)
            campaign_serializer = CampaignListSerializer(campaign)
            items = campaign.societies.all().filter(booking_status__in=['Shortlisted','Requested', 'Finalized', 'Removed'])
            serializer = CampaignInventorySerializer(items, many=True)
            response={'inventories':serializer.data, 'campaign':campaign_serializer.data}
            return Response(response, status=200)
        except :
            return Response(status=404)

    def post(self, request, id, format=None):

        try:
            for society in request.data['inventory']:
                if 'id' in society:
                    campaign_society = CampaignSocietyMapping.objects.get(pk=society['id'])
                    serializer = CampaignSocietyMappingSerializer(campaign_society,data=society)
                else:
                    #request.data['created_by'] = current_user.id
                    serializer = CampaignSocietyMappingSerializer(data=society)

                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=400)

                for inv in society['inventories']:
                    if 'id' in inv:
                        society_inv = SocietyInventoryBooking.objects.get(pk=inv['id'])
                        serializer = SocietyInventoryBookingSerializer(society_inv,data=inv)
                    else:
                        serializer = SocietyInventoryBookingSerializer(data=inv)

                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=400)

            save_type = request.data['type']
            print save_type
            if save_type and save_type=='submit':
                campaign = Campaign.objects.get(pk=id)
                campaign.booking_status = 'Finalized'
                campaign.save()

            return Response(status=200)
        except:
            return Response(status=404)


    def delete(self, request, id, format=None):
        try:
            type = request.query_params.get('type', None)
            item = CampaignSocietyMapping.objects.get(pk=id)
        except CampaignSocietyMapping.DoesNotExist:
            return Response({'message':'Requested Inventory Does not Exist'}, status=404)

        if type and (type=='Permanent'):
            inventories = SocietyInventoryBooking.objects.filter(campaign=item.campaign, society=item.society)
            for key in inventories:
                key.delete()
            item.delete()
        elif type and (type=='Temporary'):
            item.booking_status = 'Removed'
            item.save()
        else:
            return Response({'message':'Specify a correct type/mode of deletion'}, status=400)

        return Response(status=200)


class ShortlistSocietyCountAPIView(APIView):
    # to get the number of shortlisted socities on societyDetailPage
    def get(self, request, id=None, format=None):
        try:
            campaign = Campaign.objects.get(pk=id)
            societies_count = CampaignSocietyMapping.objects.filter(campaign=campaign).count()
            return Response({'count': societies_count}, status=200)
        except Campaign.DoesNotExist:
            return Response({'error':'No such campaign id exists'},status=406)
        



class ShortlistSocietyAPIView(APIView):

    # discuss use of this get function no id in url
    def get(self, request, id, format=None):
        try:
            campaign = Campaign.objects.get(pk=id)
            items = campaign.societies.all().filter(booking_status='Requested')
            serializer = FinalizeInventorySerializer(items, many=True)
            return Response(serializer.data, status=200)
        except :
            return Response(status=404)

    def post(self, request, format=None):

        print request.data
        if 'campaign_id' in request.data:
            try:
                campaign = Campaign.objects.get(pk=request.data['campaign_id'])
            except Campaign.DoesNotExist:
                return Response(status=404)
        else:
            return Response(status=400)

        if 'society_id' in request.data:
            try:
                society_id = request.data['society_id']
                society = SupplierTypeSociety.objects.get(pk=request.data['society_id'])
            except SupplierTypeSociety.DoesNotExist:
                return Response(status=404)
        else:
            return Response(status=400)

        try:
            print "Inside try"
            campaign_society = CampaignSocietyMapping.objects.get(campaign=campaign, society=society)
            total_societies = CampaignSocietyMapping.objects.filter(campaign=campaign).count()
            error = {"message" : "Already Shortlisted", 'count':total_societies}
            return Response(error, status=200)
        except CampaignSocietyMapping.DoesNotExist:
            campaign_society = CampaignSocietyMapping(campaign=campaign, society=society, booking_status='Shortlisted')
            campaign_society.save()
        # except CampaignSocietyMapping.MultipleObjectsReturned:
        #     total_societies = CampaignSocietyMapping.objects.filter(campaign=campaign).count() 
        #     error = {"message" : "Already Shortlisted", 'count':total_societies}
        #     return Response(error, status=200)

        for key in campaign.get_types():
            inventory = SocietyInventoryBooking(campaign=campaign, society=society, adinventory_type=key)
            inventory.save()

        total_societies = CampaignSocietyMapping.objects.filter(campaign=campaign).count() 
        return Response({"message": "Society Shortlisted", "id": society_id, 'count':total_societies}, status=200)


class CreateProposalAPIView(APIView):
    def get(self, request, id, format=None):
        try:
            campaign = Campaign.objects.get(pk=id)
            items = campaign.societies.filter(booking_status='Shortlisted')
            inv_types = campaign.types.all()

            response = []
            allowed = '_allowed'
            total = 'total_'
            count = '_count'
            price_dict = self.getPriceDict()
            for item in items:
                society_detail = {}     #List of society-related details required to be displayed
                society_id = item.society.supplier_id
                society_name = item.society.society_name
                society_detail['id'] = society_id
                society_detail['society_name'] = society_name
                society_detail['flat_count'] = item.society.flat_count
                society_detail['tower_count'] = item.society.tower_count
                society_detail['inventory'] = []
                inv_details = InventorySummary.objects.get(supplier_id=society_id)
                for inv in inv_types:
                    inv_name = inv.type
                    inv_size = inv.sub_type
                    #print inv_details.flier_allowed
                    #print inv_name.lower() + allowed
                    if (hasattr(inv_details, inv_name.lower() + allowed) and getattr(inv_details, inv_name.lower() + allowed)):
                        #print "has attribute"
                        if(inv_name == 'Flier'):
                            inv_count = 1
                        else:
                            inv_count = getattr(inv_details, total+inv_name.lower()+ count)
                        inv_info = {}       #List of inventory and its count details

                        # adinventory_type = models.ForeignKey('AdInventoryType', db_column='ADINVENTORY_TYPE_ID', blank=True, null=True, on_delete=models.CASCADE)
                        # supplier = models.ForeignKey('SupplierTypeSociety', db_column='SUPPLIER_ID', related_name='default_prices', blank=True, null=True, on_delete=models.CASCADE)
                        # duration_type = models.ForeignKey('DurationType', db_column='DURATION_ID', blank=True, null=True, on_delete=models.CASCADE)
                        duration_type = DurationType.objects.get(id=int(price_dict[inv_name]['duration']))
                        adinventory_type = AdInventoryType.objects.get(id=int(price_dict[inv_name]['types'][inv_size]))
                        price_obj = PriceMappingDefault.objects.get(supplier=item.society,duration_type=duration_type, adinventory_type=adinventory_type)
                        #print "price obj price is : " , price_obj.id
                        inv_price = price_obj.business_price
                        inv_info['count'] = str(inv_count)
                        inv_info['price'] = str(inv_price)
                        inv_info['type'] = inv_name
                        society_detail['inventory'].append(inv_info)

                response.append(society_detail)

            # response = (response)
            return Response(response, status=200)

        except :
            return Response(status=404)

    def getPriceDict(self):
        price_dict = {
            'Standee' : {
                            'duration': '1',
                            'types' : {
                                            'Small' : '3',
                                            'Medium' : '4',
                                            # 'Large'  : '5'
                                       }
                        },

            'Flier' : {
                            'duration' : '5',
                            'types' : {
                                        'Door-to-Door' : '12',
                                        'Mailbox' : '13',
                                      }
            },

            'Stall' : {
                            'duration': '5',
                            'types' : {
                                            'Canopy' : '6',
                                            'Small' : '7',
                                            'Large'  : '8',
                                            # 'Customize' : '9'
                                       }
            },
        }

        return price_dict

class BookCampaignAPIView(APIView):

    def get(self, request, id, format=None):
        try:
            status = request.query_params.get('status', None)
            if status:
                campaign = Campaign.objects.get(pk=id)
                campaign.booking_status = status
                campaign.save()

            return Response(status=200)
        except :
            return Response(status=404)

class FinalCampaignBookingAPIView(APIView):

    def get(self, request, id, format=None):

        try:
            campaign = Campaign.objects.get(pk=id)
            serializer = CampaignSerializer(campaign)
            return Response(serializer.data)
        except :
            return Response(status=404)

        return Response({"message": "Campaign Booked Successfully"}, status=200)







# Beta API below this point

class InitialProposalAPIView(APIView):
    '''This API creates initial proposal when the user enters the center(address, name etc.) and basic proposal 
    fields are stored in the database
    ProposalInfo and ProposalCenterMapping models are used only'''

    def post(self, request, account_id=None, format=None):
        '''In this centers contain format like 
        centers : [
            center : [
                space_mapping : []
            ]
            society_inventory : []  // these will be made if in center[space_mapping][society_allowed] is true
            corporate_inventory : []
        ] 
        This is done to be in sync with the format on map view page as serializers.data dont allow to append 
        any new (key,value) pair to its existing data
        '''

        supplier_codes = {
            'society' : 'RS',   'corporate' : 'CP',
            'gym' : 'GY',       'salon' : 'SA'
        }
        with transaction.atomic():
            proposal_data = request.data
            proposal_data['proposal_id'] = self.create_proposal_id()
            account = AccountInfo.objects.all().order_by('account_id').first()
            proposal_data['account'] = account.account_id
            try:
                proposal_object = ProposalInfo.objects.get(proposal_id=proposal_data['proposal_id'])
                # id already exists --> Do something
                return Response(status=404)
            except ProposalInfo.DoesNotExist:
                proposal_serializer = ProposalInfoSerializer(data=proposal_data)

                if proposal_serializer.is_valid():
                    proposal_object = proposal_serializer.save()
                else:
                    return Response({'message' : 'Invalid Proposal Info', 'errors' : \
                        proposal_serializer.errors}, status=406)

                for center_info in proposal_data['centers']:
                    center = center_info['center']
                    space_mapping = center['space_mapping']
                    center['proposal'] = proposal_object.proposal_id
                    center['radius'] = 1123.45
                    center_serializer = ProposalCenterMappingSerializer(data=center)

                    if center_serializer.is_valid():
                        center_object = center_serializer.save()
                    else:
                        return Response({'message' : 'Invalid Center Data', 'errors' : center_serializer.errors},\
                            status=406)

                    space_mapping['center'] = center_object.id
                    space_mapping['proposal'] = proposal_object.proposal_id
                    space_mapping_serializer = SpaceMappingSerializer(data=space_mapping)
                    if space_mapping_serializer.is_valid():
                        space_mapping_object = space_mapping_serializer.save()
                    else:
                        return Response({
                                'message' : 'Invalid Space Mapping Data',
                                'errors' : space_mapping_serializer.errors
                            }, status=406)


                    # extend the list in for loop when new spaces added. Keep the variables names accordingly          
                    for space in ['society','corporate','gym','salon']:
                        ''' This loops checks if the space is allowed and if it is allowed save the 
                        inventory types chosen by the user in the inventory_type table '''
                        try:
                            space_allowed = space + '_allowed' 
                            if space_mapping[space_allowed]:
                                space_inventory = space + '_inventory'
                                center_info[space_inventory]['supplier_code'] = supplier_codes[space]
                                center_info[space_inventory]['space_mapping'] = space_mapping_object.id
                                inventory_type_serializer = InventoryTypeSerializer(data=center_info[space_inventory])
                                if inventory_type_serializer.is_valid():
                                    inventory_type_serializer.save()
                                else:
                                    return Response({
                                            'message' : 'Invalid Inventory Type Info',
                                            'errors' : inventory_type_serializer.errors
                                        })
                        except KeyError:
                            print 'KeyError occured'
                            pass


        return Response(status=200)

    def create_proposal_id(self):
        import random, string
        return ''.join(random.choice(string.ascii_letters) for _ in range(8))




class SpacesOnCenterAPIView(APIView):
    def get(self,request,proposal_id=None, format=None):
        ''' This function filters all the spaces(Societies, Corporates etc.) based on the center and
        radius provided currently considering radius as the half of side of square
        This API is called before map view page is loaded'''

        ''' !IMPORTANT --> you have to manually add all the type of spaces that are being added apart from
        Corporate and Society '''

        response = {}

        try:
            if proposal_id is None:
                proposal_id = 'VGaLoytK';
            proposal = ProposalInfo.objects.get(proposal_id=proposal_id)
        except ProposalInfo.DoesNotExist:
            return Response({'message' : 'Invalid Proposal ID sent'}, status=406)

        proposal_centers = ProposalCenterMapping.objects.filter(proposal=proposal)
        centers_data_list = []

        for proposal_center in proposal_centers:
            try:
                space_mapping_object = SpaceMapping.objects.get(center=proposal_center)
            except SpaceMapping.DoesNotExist:
                return Response({'message' : 'Space Mapping Does Not Exist'}, status=406) 

            space_info_dict = {}

            delta_dict = get_delta_latitude_longitude(float(proposal_center.radius), float(proposal_center.latitude))

            delta_latitude = delta_dict['delta_latitude']
            min_latitude = proposal_center.latitude - delta_latitude
            max_latitude = proposal_center.latitude + delta_latitude

            delta_longitude = delta_dict['delta_longitude']
            min_longitude = proposal_center.longitude - delta_longitude
            max_longitude = proposal_center.longitude + delta_longitude


            # for society
            if space_mapping_object.society_allowed:
                q = Q(society_latitude__lt=max_latitude) & Q(society_latitude__gt=min_latitude) & Q(society_longitude__lt=max_longitude) & Q(society_longitude__gt=min_longitude)
                
                inventory_type_society = space_mapping_object.get_society_inventories()
                inventory_type_serializer = InventoryTypeSerializer(inventory_type_society)
                # applying filter on basis of inventory
                for param in ['poster_allowed', 'standee_allowed', 'flier_allowed', 'stall_allowed', 'banner_allowed']:
                    try:
                        if param == 'poster_allowed' and inventory_type_society.__dict__[param]:
                            q &= (Q(poster_allowed_nb=True) | Q(poster_allowed_lift=True))
                        elif inventory_type_society.__dict__[param]:
                            q &= Q(**{param : True})
                    except KeyError:
                        pass



                societies = SupplierTypeSociety.objects.filter(q)
                societies_count = societies.count()
                societies_serializer =  ProposalSocietySerializer(societies, many=True)

                # following query find sum of all the variables specified in a dictionary
                # this finds sum of all inventories, if you don't need some of some inventory make it 0 in front end
                society_inventory =  InventorySummary.objects.filter(supplier__in=societies).aggregate(posters=Sum('total_poster_count'),\
                    standees=Sum('total_standee_count'), stalls=Sum('total_stall_count'), fliers=Sum('flier_frequency'))


                space_info_dict['societies'] = societies_serializer.data
                space_info_dict['society_inventory_count'] = society_inventory
                space_info_dict['society_inventory'] = inventory_type_serializer.data
                space_info_dict['societies_count'] = societies_count


            if space_mapping_object.corporate_allowed:
                q = Q(latitude__lt=max_latitude) & Q(latitude__gt=min_latitude) & Q(longitude__lt=max_longitude) & Q(longitude__gt=min_longitude)
                
                # uncomment this line when corporate inventory implemented 
                # inventory_type_corporate = space_mapping_object.get_corporate_inventories().
                # inventory_type_serializer = InventoryTypeSerializer(inventory_type_corporate)
                # then run for loop almost same as above for applying filter on inventory_allowed
                # make a query for different inventory count

                corporates = SupplierTypeCorporate.objects.filter(q)
                corporates_serializer = ProposalCorporateSerializer(corporates, many=True)
                corporates_count = corporates.count()

                space_info_dict['corporates'] = corporates_serializer.data
                space_info_dict['corporates_count'] = corporates_count 
                # space_info_dict['corporate_inventory'] = inventory_type_serializer.data

            if space_mapping_object.gym_allowed:
                # write gym code for filtering 
                pass

            if space_mapping_object.salon_allowed:
                # write salon code for filtering 
                pass    
            

            proposal_center_serializer = ProposalCenterMappingSpaceSerializer(proposal_center)
            space_info_dict['center'] = proposal_center_serializer.data
            
            centers_data_list.append(space_info_dict)


            response = {
                'centers'  : centers_data_list,
            }

        return Response(response, status=200)

        # min_latitude = 18
        # max_latitude = 20

        # min_longitude = 70
        # max_longitude = 74

        # societies = SupplierTypeSociety.objects.filter(Q(society_latitude__lt=max_latitude) & Q(society_latitude__gt=min_latitude) & Q(society_longitude__lt=max_longitude) & Q(society_longitude__gt=min_longitude))
        # corporates = SupplierTypeCorporate.objects.filter(Q(latitude__lt=max_latitude) & Q(latitude__gt=min_latitude) & Q(longitude__lt=max_longitude) & Q(longitude__gt=min_longitude))

        # societies_count = societies.count()
        # corporates_count = corporates.count()

        # # This is to find inventory count
        # society_ids = societies.values_list('supplier_id',flat=True)

        # society_inventory =  InventorySummary.objects.filter(supplier_id__in=society_ids).aggregate(posters=Sum('total_poster_count'),\
        #         standees=Sum('total_standee_count'), stalls=Sum('total_stall_count'), fliers=Sum('flier_frequency'))

        # societies_serializer =  ProposalSocietySerializer(societies, many=True)
        # corporates_serializer = ProposalCorporateSerializer(corporates, many=True)  

        # response = {
        #     'societies' : societies_serializer.data,
        #     'corporates' : corporates_serializer.data,
        #     'societies_count' : societies_count,
        #     'corporates_count' : corporates_count,
        #     'society_inventory' : society_inventory,
        # }

        # return Response(response, status=200)


    def post(self, reqeust,id=None, format=None):
        '''Here write the API for changing the center and radius of a center
        '''
        pass



def get_delta_latitude_longitude(radius, latitude):
    delta_longitude = radius/(111.320 * math.cos(math.radians(latitude)))
    delta_latitude = radius/ 110.574

    return {'delta_latitude' : delta_latitude, 
            'delta_longitude' : delta_longitude}


# class GetSpaceInfoAPIView(APIView):
#     ''' This API is to fetch the space(society,corporate, gym) etc. using its supplier Code
#     e.g. RS for residential Society 

#     Currently only working for societies '''
#     def get(self, request, id , format=None):
#         try:
#             '''  On introducing new spaces we have to use if conditions to check the supplier code 
#             like RS for society and the fetch society object
#             e.g. if supplier_code == 'RS':
#                       society = SupplierTypeSociety.objects.get(supplier_id=id)
#                   else supplier_code == 'CP':
#                        corporate = SupplierTypeCorporate.objects.get(supplier_id=id)
#                         Then serialize and send  '''

#             society = SupplierTypeSociety.objects.get(supplier_id=id)
#             serializer = SupplierTypeSocietySerializer(society)
#             return Response(serializer.data, status=200)
#         except SupplierTypeSociety.DoesNotExist:
#             return Response({'message' : 'No society Exists'}, status=406)


class GetFilteredSocietiesAPIView(APIView):
    

    def get(self, request, format=None):
        ''' This API gives societies based on different filters from mapView and gridView Page
        Currently implemented filters are locality and location (Standard, Medium High etc.)
        flat_count (100 - 250 etc.) flat_type(1BHK, 2BHK etc.) '''

        latitude = request.query_params.get('lat', None)
        longitude = request.query_params.get('lng',None)
        radius = request.query_params.get('r',None) # radius change
        location_params = request.query_params.get('loc',None)
        society_quality_params = request.query_params.get('qlt',None)
        society_quantity_params = request.query_params.get('qnt',None)
        flat_count = request.query_params.get('flc',None)
        flat_type_params = request.query_params.get('flt',None)
        inventory_params = request.query_params.get('inv',None)
        

        q = Q()
        quality_dict , inventory_dict, society_quantity_dict = get_related_dict()

        flat_type_dict = {
            '1R' : '1 RK',      '1B' : '1 BHK',     '1-5B' : '1.5 BHK',     '2B' : '2 BHK',
            '2-5B' : '2.5 BHK',    '3B' : '3 BHK',  '3-5B' : '3.5 BHK',     '4B' : '4 BHK',
            '5B' : '5 BHK',         'PH' : 'PENT HOUSE',    'RH' : 'ROW HOUSE',  'DP' : 'DUPLEX' 
        }

        # if not radius:

        if not latitude or not longitude or not radius:
            return Response({'message' : 'Please Provide longitude and latitude and radius as well'}, status=406)


        if flat_type_params:
            flat_types = []
            flat_type_params = flat_type_params.split()
            for param in flat_type_params:
                try:
                    flat_types.append(flat_type_dict[param])
                except KeyError:
                    pass

            if flat_types:
                ''' We can improve performance here  by appending .distinct('society_id') when using postgresql ''' 
                society_ids = set(FlatType.objects.filter(flat_type__in=flat_types).values_list('society_id',flat=True))
                q &= Q(supplier_id__in=society_ids)
                # here to include those societies which don't have this info nothing can be done 
                # It is simply all the societies -> filter becomes useless


        # calculating for latitude and longitude
        # this is done to ensure that the societies are sent according to the current radius and center in frontend
        # user can change center and radius and it will not be stored in the database until saved
        latitude = float(latitude)
        longitude = float(longitude)
        delta_dict = get_delta_latitude_longitude(float(radius), latitude)

        max_latitude = latitude + delta_dict['delta_latitude']
        min_latitude = latitude - delta_dict['delta_latitude']

        delta_longitude = delta_dict['delta_longitude']
        max_longitude = longitude + delta_dict['delta_longitude']
        min_longitude = longitude - delta_dict['delta_longitude']

        q &= Q(society_latitude__lt=max_latitude) & Q(society_latitude__gt=min_latitude) & Q(society_longitude__lt=max_longitude) & Q(society_longitude__gt=min_longitude)
        
        if location_params:
            location_ratings = []
            location_params = location_params.split()
            for param in location_params:
                try:
                    location_ratings.append(quality_dict[param])
                except KeyError:
                    pass
            if location_ratings:
                q &= Q(society_location_type__in=location_ratings)
                # if required to include societies with null value of this parameter uncomment following line
                # will not work if there is default value is something then replace __isnull=True --> = defaultValue
                # q &= Q(society_location_type__isnull=True)  

        if society_quality_params:
            society_quality_ratings = []
            society_quality_params = society_quality_params.split()
            for param in society_quality_params:
                try:
                    society_quality_ratings.append(quality_dict[param])
                except KeyError:
                    pass

            if society_quality_ratings:
                q &= Q(society_type_quality__in=society_quality_ratings)
                # if required to include societies with null value of this parameter uncomment following line
                # will not work if there is default value is something then replace __isnull=True --> = defaultValue
                # q &= Q(society_type_quality__isnull=True)  

        if society_quantity_params:
            society_quantity_ratings = []
            society_quantity_params = society_quantity_params.split()
            for param in society_quantity_params:
                try:
                    society_quantity_ratings.append(society_quantity_dict[param])
                except KeyError:
                    pass

            if society_quantity_ratings:
                q &= Q(society_type_quantity__in=society_quantity_ratings)
                # if required to include societies with null value of this parameter uncomment following line
                # will not work if there is default value is something then replace __isnull=True --> = defaultValue
                # q &= Q(society_type_quantity__isnull=True)  

        if flat_count:
            flat_count = flat_count.split()
            if len(flat_count) == 2:
                flat_min = flat_count[0]
                flat_max = flat_count[1]

                q &= Q(flat_count__gte=flat_min) & Q(flat_count__lte=flat_max)
                # if required to include societies with null value of this parameter uncomment following line
                # will not work if there is default value is something then replace __isnull=True --> = defaultValue
                # q &= Q(flat_count__isnull=True)  


        if inventory_params:
            inventory_params = inventory_params.split()
            for param in inventory_params:
                try:
                    if param == 'PO':
                        q &= (Q(poster_allowed_nb=True) | Q(poster_allowed_lift=True))
                    else:
                        inventory = inventory_dict[param]
                        q &= Q(**{inventory : True})
                except KeyError:
                    pass

        print "\n\nq is ", q
        print "\n\n"

        societies = SupplierTypeSociety.objects.filter(q)
        society_ids= societies.values_list('supplier_id',flat=True)
        societies_count = societies.count()

        society_inventory_count =  InventorySummary.objects.filter(supplier_id__in=society_ids).aggregate(posters=Sum('total_poster_count'),\
                standees=Sum('total_standee_count'), stalls=Sum('total_stall_count'), fliers=Sum('flier_frequency'))

        society_serializer = ProposalSocietySerializer(societies, many=True)

        response = {
            'societies' : society_serializer.data,
            'society_inventory_count' : society_inventory_count,
            'societies_count' : societies_count
        }

        return Response(response, status=200)


    def post(self, request, format=None):
        ''' This API is for deep filtering 
        Basic Idea is that if filter is chosen on the left of the map view page get request is fired
        But if he clicks on deep filters he can choose on almost anything like cars_count, luxury_cars_count,
        avg_pg_occupancy, women_occupants, etc. whatever required. This is the approach most commonly found on
        other websites '''
        pass



def get_related_dict():
    ''' This dictionary is simply a mapping from get params to their actual values '''
    # quality_dict if for both society_quality and its location_quality and similarly for other spaces
    quality_dict = {
        'UH' : 'Ultra High',    'HH' : 'High',
        'MH' : 'Medium High',   'ST' : 'Standard'    
    }

    inventory_dict = {
        'PO' : 'poster_allowed_nb',    'ST' : 'standee_allowed',
        'SL' : 'stall_allowed',     'FL' : 'flier_allowed',
        'BA' : 'banner_allowed',    'CD' : 'car_display_allowed',
    }

    quantity_dict = {
        'LA' : 'Large',     'MD' : 'Medium',
        'VL' : 'Very Large',  'SM' : 'Small',
    }

    return quality_dict, inventory_dict, quantity_dict



class FinalProposalAPIView(APIView):

    def post(self, request, format=None):
        pass




# class FinalProposalAPIView(APIView):

#     def get(self,request, format=None):
#         ''' This API creates/update the proposal related to a particular account
#         Currently Versioning of Proposals is not done
#         Tables for versioning are still to be made'''
#         from datetime import datetime
#         proposal = {
#             'proposal_id' : 'BUSACCP01',
#             'account_id' : '2',
#             'name' : 'Sample Proposal',
#             'tentative_cost' : '50000',
#             'tentative_start_date' : datetime.now(),
#             'tentative_end_date' : datetime.now(),
#             'centers' : [{
#                 'center_name' : 'Oxford Chambers',
#                 'Address' : '',
#                 'latitude' : 19.119128, 
#                 'longitude' : 72.890795,
#                 'radius' : 3.5,
#                 'area' : 'Powai',
#                 'subarea' : 'Hiranandani Gardens',
#                 'city'    : 'Mumbai',
#                 'pincode' : '400072',

#                 'space_mappings' : [
#                     {
#                         'space_name' : 'society',
#                         'space_count' : '10',
#                         'buffer_space_count' : '5',
#                         'spaces' : [
#                             {  'object_id' : 'S1'},
#                             {  'object_id' : 'S2'},
#                             {  'object_id' : 'S3'},
#                             {  'object_id' : 'S4'},
#                         ],

#                         'inventories' : [
#                             {
#                                 'inventory_name' : 'POSTER',
#                                 'inventory_type' : 'A3',
#                             },
#                             {
#                                 'inventory_name' : 'POSTER LIFT',
#                                 'inventory_type' : 'A3',
#                             },
#                             {
#                                 'inventory_name' : 'STANDEE',
#                                 'inventory_type' : 'MEDIUM',
#                             },
#                         ],
#                     },

#                     {
#                         'space_name' : 'Corporate',
#                         'space_count' : '14',
#                         'buffer_space_count' : '4',
#                         'spaces' : [
#                             {'object_id' : 'CP1'},
#                             {'object_id' : 'CP2'},
#                             {'object_id' : 'CP3'},
#                         ],

#                         'inventories' : [
#                             {
#                                 'inventory_name' : 'POSTER',
#                                 'inventory_type' : 'A3',
#                             },
#                             {
#                                 'inventory_name' : 'POSTER LIFT',
#                                 'inventory_type' : 'A3',
#                             },
#                             {
#                                 'inventory_name' : 'STANDEE',
#                                 'inventory_type' : 'MEDIUM',
#                             },
#                         ],
#                     },
#                 ],

#             }],
#         }

#         with transaction.atomic():
#             proposal['account'] = proposal['account_id']

#             try:
#                 proposal_object = ProposalInfo.objects.get(proposal_id = proposal['proposal_id'])
#                 proposal_serializer = ProposalInfoSerializer(proposal_object,data=proposal)
#             except ProposalInfo.DoesNotExist:
#                 proposal_serializer = ProposalInfoSerializer(data=proposal)

#             if proposal_serializer.is_valid():
#                 proposal_object = proposal_serializer.save()
#             else: 
#                 return Response({'message' : 'Proposal Serializer Invalid', \
#                     'errors' : proposal_serializer.errors}, status=406)
            

#             centers = proposal['centers']

#             space_mappings_superset = set()
#             inventory_type_superset = set()
#             spaces_superset = set()
#             centers_superset  = set(proposal_object.get_centers().values_list('id',flat=True))
            
#             for center in centers:
#                 center['proposal'] = proposal_object.proposal_id

#                 if 'id' in center:
#                     center_object = ProposalCenterMapping.objects.get(id=center['id'])
#                     centers_superset.remove(center_object.id)
#                     center_serializer = ProposalCenterMappingSerializer(center_object ,data=center)
#                 else:
#                     center_serializer = ProposalCenterMappingSerializer(data=center)

#                 if center_serializer.is_valid():
#                     center_object = center_serializer.save()
#                 else:
#                     return Response({'message' : 'Center Serializer Invalid',\
#                         'errors' : center_serializer.errors}, status=406)

                

#                 space_mappings = center['space_mappings']
#                 space_mappings_set = set(SpaceMapping.objects.filter(center=center_object).values_list('id',flat=True))

#                 for space_mapping in space_mappings:

#                     content_model = "SupplierType" + space_mapping['space_name'].title() 
#                     content_type = ContentType.objects.get(model=content_model)


#                     space_mapping['proposal'] = proposal_object.proposal_id
#                     space_mapping['center'] = center_object.id
#                     space_mapping['inventory_type_count'] = len(space_mapping['inventories'])

#                     if 'id' in space_mapping:
#                         space_mapping_object = SpaceMapping.objects.get(id=space_mapping['id'])
#                         space_mappings_set.remove(space_mapping_object.id)
#                         space_mapping_serializer = SpaceMappingSerializer(space_mapping_object,data=space_mapping)
#                     else:    
#                         space_mapping_serializer = SpaceMappingSerializer(data=space_mapping)

#                     if space_mapping_serializer.is_valid():
#                         space_mapping_object = space_mapping_serializer.save()
#                     else :
#                         return Response({'message' : 'Invalid Space Mapping Received',\
#                             'errors' : space_mapping_serializer.errors}, status=406)


                    
#                     inventories = space_mapping['inventories']
#                     inventory_type_set = set(InventoryType.objects.filter(space_mapping=space_mapping_object).values_list('id',flat=True))
#                     for inventory in inventories:
#                         inventory['space_mapping'] = space_mapping_object.id

#                         if 'id' in inventory:
#                             inventory_type_object = InventoryType.objects.get(id=inventory['id'])
#                             inventory_type_set.remove(inventory_type_object.id)
#                             inventory_serializer = InventoryTypeSerializer(inventory_type_object, data=inventory)
#                         else:
#                             inventory_serializer = InventoryTypeSerializer(data=inventory)

#                         if inventory_serializer.is_valid():
#                             inventory_serializer.save()
#                         else:
#                             return Response({'message' : 'Invalid Inventory Received',\
#                                 'errors' : inventory_serializer.errors} , status=406 )

#                     inventory_type_superset = inventory_type_superset.union(inventory_type_set)

                    
#                     spaces = space_mapping['spaces']
#                     spaces_set = set(ShortlistedSpaces.objects.filter(space_mapping=space_mapping_object).values_list('id',flat=True))
                    
#                     for space in spaces:
#                         if not 'buffer_status' in space:
#                             space['buffer_status'] = 'false' 
#                         print space

#                         space['content_type'] = content_type.id
#                         space['space_mapping'] = space_mapping_object.id

#                         if 'id' in space:
#                             space_object = ShortlistedSpaces.objects.get(id=space['id'])
#                             spaces_set.remove(space_object.id)
#                             space_serializer = ShortlistedSpacesSerializer(space_object, data=space)
#                         else:
#                             space_serializer = ShortlistedSpacesSerializer(data=space)

#                         if space_serializer.is_valid():
#                             space_serializer.save()
#                         else:
#                             return Response({'message' : 'Invalid Space Received',\
#                                 'errros' : space_serializer.errors}, status=406)
            
#                     spaces_superset = spaces_superset.union(spaces_set)

#                 space_mappings_superset = space_mappings_superset.union(space_mappings_set)
            

#             ProposalCenterMapping.objects.filter(id__in=centers_superset).delete()            
#             SpaceMapping.objects.filter(id__in=space_mappings_superset).delete()
#             InventoryType.objects.filter(id__in=inventory_type_superset).delete()
#             ShortlistedSpaces.objects.filter(id__in=spaces_superset).delete()

#         return Response(status=200)



# 19.119128, 72.890795







class SocietySaveCSVAPIView(APIView):
    def get(self,request,format=None):
        import csv, sys
        from v0.models import City, CityArea, CitySubArea, ContactDetails
        with transaction.atomic():
            file = open('/home/prince/Desktop/CSV Testing/society_files/supplier_id.csv','rb')
            file_errros = open('/home/prince/Desktop/CSV Testing/society_files/supplier_id_error.txt','w')
            try:
                reader = csv.reader(file)
                for num, row in enumerate(reader):
                    d = {}
                    if num == 0 :
                        continue
                    else:
                        d['society_city'] , d['society_locality'] , d['society_subarea'] , supplier_type_1, d['society_name'], d['supplier_code'] = row[0].title(), row[1].title(), row[2].title(), row[3], row[4], row[5]
                        supplier_type_1 = 'RS'
                        if not (d['society_city'] and d['society_locality'] and d['society_subarea'] and d['supplier_code'] and d['society_name'] and d['supplier_code']):
                            file_errros.write("Errors in "+ str(num+1) + " line\t--->Some variables not present\n\n")
                            continue
                        try:
                            city_object = City.objects.get(city_name=d['society_city'])
                            area_object = CityArea.objects.get(label = d['society_locality'])
                            subarea_object = CitySubArea.objects.get(subarea_name=d['society_subarea'],area_code=area_object)

                            d['supplier_id'] = city_object.city_code + area_object.area_code + subarea_object.subarea_code + supplier_type_1 + d['supplier_code']
                            try:
                                society_object = SupplierTypeSociety.objects.get(supplier_id=d['supplier_id']) 
                                file_errros.write("Error in " + str(num+1) + " line\t---> Society with supplier code "\
                                    + d['supplier_code'] + " already exists in that subarea. Still Updating the details\n\n")
                                society_object.__dict__.update(d)
                                society_object.save()
                                print "\n\n\nsaving socity"
                                print "society_object dict :" 
                                for i in ['supplier_id','society_city','society_locality','society_subarea','society_name']:
                                    try:
                                        print i + " : " + society_object.__dict__[i]
                                    except KeyError:
                                        print "Key Error  : ", i 
                                print "\n\n\n"
                                continue
                            except SupplierTypeSociety.DoesNotExist:
                                society_object = SupplierTypeSociety()
                                society_object.__dict__.update(d)
                                society_object.save()
                                print "\n\n\nsaving socity"
                                print "society_object dict :" , society_object.__dict__
                                print "\n\n\n"

                        except City.DoesNotExist:
                            file_errros.write("Error in "+ str(num+1) + " line\t---> City Name is Wrong\n\n")
                        except CityArea.DoesNotExist:
                            file_errros.write("Error in "+ str(num+1) + " line\t---> Area Name is Wrong\n\n")
                        except CitySubArea.DoesNotExist:
                            file_errros.write("Error in " + str(num+1) + " line\t---> Subarea Name is Wrong\n\n")
                        except CitySubArea.MultipleObjectsReturned:
                            return Response({'message' : 'Line 1238 error found'}, status=200)
            finally:
                file.close()
                file_errros.close()



            file = open('/home/prince/Desktop/CSV Testing/society_files/new_basic_tab.csv','rb')
            file_errros = open('/home/prince/Desktop/CSV Testing/society_files/basic_tab_errors.txt','w')

            try:
                reader = csv.reader(file)
                for num, row in enumerate(reader):
                    if num == 0:
                        continue
                    else: 
                        d = {}
                        try:
                            length = len(row)
                            print "row[26]" , row[26]
                        except IndexError: 
                            return Response({'message' : 'Index Out of Range', 'maxIndex' : \
                                length, 'row' : row},status=200)

                        d['supplier_code'], d['society_subarea'], d['society_address1'], d['society_address2'], d['society_zip'], \
                        d['society_latitude'], d['society_longitude'], possession_year, d['tower_count'], d['flat_count'], d['vacant_flat_count'],\
                        d['service_household_count'], d['working_women_count'], d['avg_household_occupants'], d['bachelor_tenants_allowed'], \
                        d['flat_avg_rental_persqft'], d['cars_count'], d['luxury_cars_count'], d['society_location_type'], d['society_type_quality'], \
                        d['society_type_quantity'], d['count_0_5'], d['count_5_15'], d['count_15_25'], d['count_25_60'], d['count_60above'], \
                        d['society_weekly_off'] = row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9],\
                                            row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18]\
                                            , row[19], row[20], row[21], row[22], row[23], row[24], row[25], row[26]

                        if not (d['supplier_code'] and d['society_subarea']):
                            file_errros.write('Error in ' + str(num+1) + " line\t--> Please provide Supplier Code and Society Subarea\n\n")

                        for key in d.keys():
                            if d[key] == '':
                                d[key] = None
                            if type(d[key]) == type('abc'):  # This to just make sure type is string
                                d[key] = d[key].replace("\n", " ")

                        if type(d['society_type_quality']) == type('abc'):
                            d['society_type_quality'] = d['society_type_quality'].title()                         

                        try:
                            society_object = SupplierTypeSociety.objects.get(supplier_code=d['supplier_code'], society_subarea=d['society_subarea'])
                            subarea_object = CitySubArea.objects.get(subarea_name=d['society_subarea'],area_code__label=society_object.society_locality)
                            d['society_location_type'] = subarea_object.locality_rating
                            d['society_state'] = 'Maharashtra'
                            society_object.__dict__.update(d)
                            society_object.save()

                            print "\n\nSaving Basic Details"
                            for key in d.keys():
                                try:
                                    if society_object.__dict__[key] != None:
                                        print key + " : " + society_object.__dict__[key]
                                    else:
                                        print key , " : " , None
                                except KeyError:
                                    print "\nKey Error " + key + "\n"

                        except SupplierTypeSociety.DoesNotExist:
                            file_errros.write("Error in " + str(num+1) + " line\t--> Supplier Code + Subarea don't correspond to a society in Database\n\n")
                        except SupplierTypeSociety.MultipleObjectsReturned:
                            file_errros.write("Error in " + str(num+1) + " line\t-->Supplier Code + subarea have more than 1 objects\t MY bad Sorry for this\n\n")


            finally:
                file.close()
                file_errros.close()




            file = open('/home/prince/Desktop/CSV Testing/society_files/contacts.csv','rb')
            file_errros = open('/home/prince/Desktop/CSV Testing/society_files/contacts_errors.txt','w')

            try:
                reader = csv.reader(file)
                for num, row in enumerate(reader):
                    if num == 0:
                        continue

                    else:
                        d = {}
                        supplier_code, subarea, d['contact_type'], d['salutation'], d['name'], d['landline'], d['mobile'],\
                        d['email'] = row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]
                        d['std_code'] = '022'
                        d['country_code'] = '+91'


                        d['landline'] = d['landline'].split('-',1)
                        d['landline'].reverse()
                        d['landline'] = d['landline'][0]

                        d['mobile'] = d['mobile'].split('-',1)
                        d['mobile'].reverse()
                        d['mobile'] = d['mobile'][0]


                        for key in d.keys():
                            if d[key] == '':
                                d[key] = None

                        try:
                            society_object = SupplierTypeSociety.objects.get(supplier_code=supplier_code, society_subarea=subarea)
                            d['supplier_id'] = society_object.supplier_id
                            d['spoc'] = False
                            # try:
                            #     contact_object = ContactDetails(supplier=society_object, name=d['name'], salutation=d['salutation'])
                            # except ContactDetails.DoesNotExist:
                            #     pass

                            contact_object = ContactDetails()
                            contact_object.__dict__.update(d)
                            contact_object.save()
                        except SupplierTypeSociety.DoesNotExist:
                            file_errros.write('Error in ' + str(num+1) + ' line\t--> No idea with given Supplier Code and Subarea exists in Database \n\n')


            finally:    
                file.close()
                file_errros.close()

        return Response(status=200)
