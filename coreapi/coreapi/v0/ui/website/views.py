from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from serializers import UIBusinessSerializer, CampaignListSerializer, CampaignInventorySerializer, UIAccountSerializer
from v0.serializers import CampaignSupplierTypesSerializer, SocietyInventoryBookingSerializer, CampaignSerializer, CampaignSocietyMappingSerializer, BusinessSerializer, BusinessContactSerializer, ImageMappingSerializer, InventoryLocationSerializer, AdInventoryLocationMappingSerializer, AdInventoryTypeSerializer, DurationTypeSerializer, PriceMappingDefaultSerializer, PriceMappingSerializer, BannerInventorySerializer, CommunityHallInfoSerializer, DoorToDoorInfoSerializer, LiftDetailsSerializer, NoticeBoardDetailsSerializer, PosterInventorySerializer, SocietyFlatSerializer, StandeeInventorySerializer, SwimmingPoolInfoSerializer, WallInventorySerializer, UserInquirySerializer, CommonAreaDetailsSerializer, ContactDetailsSerializer, EventsSerializer, InventoryInfoSerializer, MailboxInfoSerializer, OperationsInfoSerializer, PoleInventorySerializer, PosterInventoryMappingSerializer, RatioDetailsSerializer, SignupSerializer, StallInventorySerializer, StreetFurnitureSerializer, SupplierInfoSerializer, SportsInfraSerializer, SupplierTypeSocietySerializer, SocietyTowerSerializer, BusinessTypesSerializer, BusinessSubTypesSerializer, AccountSerializer, AccountContactSerializer
from v0.models import CampaignSupplierTypes, SocietyInventoryBooking, CampaignTypeMapping, Campaign, CampaignSocietyMapping, Business, BusinessContact, ImageMapping, InventoryLocation, AdInventoryLocationMapping, AdInventoryType, DurationType, PriceMappingDefault, PriceMapping, BannerInventory, CommunityHallInfo, DoorToDoorInfo, LiftDetails, NoticeBoardDetails, PosterInventory, SocietyFlat, StandeeInventory, SwimmingPoolInfo, WallInventory, UserInquiry, CommonAreaDetails, ContactDetails, Events, InventoryInfo, MailboxInfo, OperationsInfo, PoleInventory, PosterInventoryMapping, RatioDetails, Signup, StallInventory, StreetFurniture, SupplierInfo, SportsInfra, SupplierTypeSociety, SocietyTower, BusinessTypes, BusinessSubTypes, Account, AccountContact
from django.db.models import Q
from django.db import transaction
from rest_framework import status
import json


class getBusinessTypesAPIView(APIView):
    def get(self, request, format=None):
        try:
            busTypes = BusinessTypes.objects.all()
            serializer = BusinessTypesSerializer(busTypes, many=True)
            return Response(serializer.data, status=200)
        except :
            return Response(status=404)


class BusinessAPIListView(APIView):
    def get(self, request, format=None):
        try:
            items = Business.objects.all()
            serializer = BusinessSerializer(items, many=True)
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
            item = Business.objects.get(pk=id)
            serializer = UIBusinessSerializer(item)
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



class AccountAPIListView(APIView):
    def get(self, request, format=None):
        try:
            items = Account.objects.all()
            serializer = AccountSerializer(items, many=True)
            return Response(serializer.data, status=200)
        except :
            return Response(status=404)


class AccountAPIView(APIView):
    def get(self, request, id, format=None):
        #try:
            account = Account.objects.get(pk=id)
            serializer1 = UIAccountSerializer(account)
            business = Business.objects.get(pk=account.business_id)
            serializer2 = BusinessSerializer(business)
            '''contacts = AccountContact.objects.filter(account=account)
            serializer3 = AccountContactSerializer(contacts, many=True)'''

            serializer = {'account':serializer1.data, 'business':serializer2.data}
            return Response(serializer, status=200)
        #except :
        #    return Response(status=404)


class NewCampaignAPIView(APIView):
     def post(self, request, format=None):

            # print "\n\n\n  Request Data : "
            # print request.data
            # print "\n\n\n"

            current_user = request.user
            business_data = request.data['business']
            error = {}

            # checking if the business with the same name already exists in the database
            try:
                if 'id' not in business_data :
                    business = Business.objects.get(name=business_data['name'])
                    error['message'] = 'Business with this name already exists'
                    error = json.dumps(error)
                    return Response(error, status = status.HTTP_406_NOT_ACCEPTABLE)
                # else:
                #     print "\n\nYeyyyy! found id in the business \n\n"
            except Business.DoesNotExist:
                pass


            with transaction.atomic():
                if 'id' in business_data:
                    # print "\nInside if 1\n"
                    business = Business.objects.get(pk=business_data['id'])
                    serializer = BusinessSerializer(business,data=business_data)
                else:
                    # print "\nInside else 1\n"
                    #request.data['created_by'] = current_user.id
                    serializer = BusinessSerializer(data=business_data)

                if serializer.is_valid():
                    # print "\n\n\n Business Serializer Validated Data"
                    # print serializer.validated_data
                    # print "\n\n\n"
                    try:
                        type_name = BusinessTypes.objects.get(id=int(business_data['type_name_id']))
                        sub_type = BusinessSubTypes.objects.get(id=int(business_data['sub_type_id']))
                        serializer.save(type_name=type_name, sub_type=sub_type)

                    except ValueError:
                        error['message'] = "Business Type/SubType Invalid"
                        error = json.dumps(error)
                        return Response(error, status=status.HTTP_406_NOT_ACCEPTABLE)

                else:
                    return Response(serializer.errors, status=400)

                business = Business.objects.get(pk=serializer.data['id'])
                # print "\n\n\n***************************************"
                # print "Business Contacts : ", business_data['contacts'] 
                # print "***************************************\n\n\n"


                #here we will start storing contacts
                #if 'contact' in business_data and business_data['contact']:
                for contact in business_data['contacts']:
                    if contact['spoc'] == '':
                        contact['spoc'] = 'false'
                    if 'id' in contact:
                        # print "\nInside if 2\n"
                        item = BusinessContact.objects.get(pk=contact['id'])
                        contact_serializer = BusinessContactSerializer(item, data=contact)
                    else:
                        # print "\nInside else 2\n"
                        contact_serializer = BusinessContactSerializer(data=contact)

                    contact_serializer.is_valid(raise_exception=True)

                    # print "\n\n\n***************************************"
                    # print contact_serializer.validated_data
                    # print "***************************************\n\n\n"
                    
                    contact_serializer.save(business=business)
                
                business_serializer = BusinessSerializer(business)
                contacts = business.contacts.all()
                contacts_serializer = BusinessContactSerializer(contacts, many=True)

                response = json.dumps({
                        'business' : business_serializer.data,
                        'contacts' : contacts_serializer.data,
                    })
            return Response(response,status=200)


class CreateCampaignAPIView(APIView):
    def post(self, request, format=None):
            # print "request. Data"
            # print request.data
            response = {}
            # print "\n\n\n"
            current_user = request.user
            errro = {}

            # checking if the data received contains name of the account
            try : 
                account_data = request.data['account']
                account_name = account_data['name']
            except KeyError :
                # print "account object not found"
                error['message'] = 'Appropriate data not provided',
                error = json.dumps(error)
                return Response(error, status = status.HTTP_406_NOT_ACCEPTABLE)

            with transaction.atomic():
                
                # checking if the account with the same name already exists or not
                if 'id' not in account_data:
                    try:
                        acc = Account.objects.get(name=account_data['name'])
                        error['message'] =  'Business with this name already exists',
                        error = json.dumps(error)
                        return Response(error, status = status.HTTP_406_NOT_ACCEPTABLE)
                    except Account.DoesNotExist:
                        pass

                # checking if business id is integer
                try:
                    business_id = int(account_data['business_id'])
                except ValueError: 
                    error['message'] = "Imporper Business Type Id"
                    error = json.dumps(error)
                    return Response(error, status = status.HTTP_406_NOT_ACCEPTABLE)

                
                # checking a valid business
                try:
                    business = Business.objects.get(id=business_id)
                except Business.DoesNotExist:
                    error['message'] =  "Business Does Not Exist"
                    error = json.dumps(error)
                    return Response(error, status = status.HTTP_406_NOT_ACCEPTABLE)

                if 'id' in account_data:
                    # print "Inside  if 1"
                    # print "Account data id = ", account_data['id']
                    account = Account.objects.get(pk=account_data['id'])
                    serializer = AccountSerializer(account,data=account_data)
                else:
                    #request.data['created_by'] = current_user.id
                    # print "Inside else 1"
                    serializer = AccountSerializer(data=account_data)

                if serializer.is_valid():
                    serializer.save(business=business)
                else:
                    return Response(serializer.errors, status=400)

                account_id = serializer.data['id']
                account = Account.objects.get(id=account_id)
            
                # #here we will start storing contacts
                for contact in account_data['contacts']:                     
                    # print "hi0"
                
                    # assinging spoc = False if not present in the data received 
                    if contact['spoc'] == '':
                        contact['spoc'] = 'false'
                    if 'id' in contact:
                        # print "hi1"
                        item = AccountContact.objects.get(pk=contact['id'])
                        contact_serializer = AccountContactSerializer(item, data=contact)
                    else:
                        # print "hi2"
                        contact_serializer = AccountContactSerializer(data=contact)
                    if contact_serializer.is_valid():
                        # print "hi3"
                        contact_serializer.save(account=account)
                        # print "Contact serializer done"
                    else:
                        return Response(contact_serializer.errors, status=400)



                if 'campaign_type' in request.data or 'supplier_type' in request.data:
                    campaign_data = {'booking_status':'Shortlisted'}
                    if 'tentative' in request.data:
                        for key in request.data['tentative']:
                            campaign_data[key] = request.data['tentative'][key]

                        # print '\n\nCampaign Data =  '
                        # print campaign_data
                        # print '\n\n'

                    campaign_serializer = CampaignSerializer(data=campaign_data)

                    campaign_serializer.is_valid(raise_exception=True)
                    campaign_serializer.save(account=account)
                    
                    campaign = Campaign.objects.get(pk=campaign_serializer.data['id'])

                    if 'campaign_type' in request.data:
                        for key, value in request.data['campaign_type'].iteritems():
                            campaign_type_map = CampaignTypeMapping(campaign=campaign, type=key, sub_type=value)

                            campaign_type_map.save()

                    if 'supplier_type' in request.data:
                        for key, value in request.data['supplier_type'].iteritems():
                            supplier_type_map = CampaignSupplierTypes(campaign=campaign, supplier_type=key, count=value)
                            supplier_type_map.save()
                            response['campaign'] = campaign_serializer.data

                    # redirecting to societylist page if the campaign info received
                    return  Response(campaign_serializer.data, status=201)

                
                # sending accounts and related contacts fields to allow updating 
                account = Account.objects.get(id=account_id)
                account_serializer = AccountSerializer(account)
                contacts = account.contacts.all()
                contacts_serializer = AccountContactSerializer(contacts, many=True)
                response['account'] = account_serializer.data
                response['contacts'] = contacts_serializer.data
            return Response(response, status=200)



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
            error = {"message" : "Already Shortlisted"}
            return Response(error, status=200)
        except CampaignSocietyMapping.DoesNotExist:
            campaign_society = CampaignSocietyMapping(campaign=campaign, society=society, booking_status='Shortlisted')
            campaign_society.save()
        except CampaignSocietyMapping.MultipleObjectsReturned:
            error = {"message" : "Already Shortlisted"}
            return Response(error, status=200)

        for key in campaign.get_types():
            inventory = SocietyInventoryBooking(campaign=campaign, society=society, adinventory_type=key)
            inventory.save()

        return Response({"message": "Society Shortlisted", "id": society_id}, status=200)


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
