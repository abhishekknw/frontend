# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin sqlcustom [app_label]'
# into your database.

# codes for supplier Types  Society -> RS   Corporate -> CP  Gym -> GY   salon -> SA

from __future__ import unicode_literals

import managers
from django.conf import settings
# from django.contrib.auth.models import AbstractUser, Permission
from django.contrib.contenttypes import fields
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone

from v0.constants import supplier_id_max_length
from v0.ui.user.models import BaseUser
from v0.ui.base.models import BaseModel
from v0.ui.campaign.models import Campaign, CampaignTypeMapping
from v0.ui.organisation.models import Organisation
from v0.ui.proposal.models import SpaceMapping, SpaceMappingVersion
from v0.ui.supplier.models import SupplierTypeCorporate

AD_INVENTORY_CHOICES = (
    ('POSTER', 'Poster'),
    ('STANDEE', 'Standee'),
    ('STALL', 'Stall'),
    ('CAR DISPLAY', 'Car Display'),
    ('FLIER', 'Flier'),
    ('BANNER', 'Banner'),
    ('POSTER LIFT', 'Poster Lift'),
    ('GLASS_FACADE', 'GLASS_FACADE'),
    ('HOARDING', 'HOARDING'),
    ('DROPDOWN', 'DROPDOWN'),
    ('STANDEE', 'STANDEE'),
    ('PROMOTION_DESK', 'PROMOTION_DESK'),
    ('PILLAR', 'PILLAR'),
    ('TROLLEY', 'TROLLEY'),
    ('WALL_INVENTORY', 'WALL_INVENTORY'),
    ('FLOOR_INVENTORY', 'FLOOR_INVENTORY'),
    ('GATEWAY ARCH', 'GATEWAY ARCH')
)


# class BaseInventory(BaseModel):
#     """
#     A BaseInventory model for all inventories. The fields here are common for all inventories.
#     """
#     status = models.CharField(max_length=10, default=v0_constants.inventory_status)
#
#     class Meta:
#         abstract = True


class CustomPermissions(BaseModel):
    """
    This is a model which stores extra permissions granted for a particular user
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID)
    extra_permission_code = models.CharField(max_length=255)
    description = models.CharField(max_length=1000, null=True)

    class Meta:
        db_table = 'custom_permissions'



class ImageMapping(BaseModel):
    id = models.AutoField(db_column='ID', primary_key=True)
    location_id = models.CharField(db_column='LOCATION_ID', max_length=20, blank=True, null=True)  # Field name made lowercase.
    location_type = models.CharField(db_column='LOCATION_TYPE', max_length=20, blank=True, null=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', db_column='SUPPLIER_ID', related_name='images', blank=True, null=True, on_delete=models.CASCADE)
    image_url = models.CharField(db_column='IMAGE_URL', max_length=100)
    comments = models.CharField(db_column='COMMENTS', max_length=100, blank=True, null=True)
    name = models.CharField(db_column='NAME', max_length=50, blank=True, null=True)
    content_type = models.ForeignKey(ContentType, null=True)
    object_id = models.CharField(max_length=supplier_id_max_length, null=True)
    content_object = fields.GenericForeignKey('content_type', 'object_id')
    objects = managers.GeneralManager()

    class Meta:
        db_table = 'image_mapping'

class DurationType(BaseModel):
    id = models.AutoField(db_column='ID', primary_key=True)
    duration_name = models.CharField(db_column='DURATION_NAME', max_length=20)  # Field name made lowercase.
    days_count = models.CharField(db_column='DAYS_COUNT', max_length=10)  # Field name made lowercase.

    class Meta:
        db_table = 'duration_type'

class CommunityHallInfo(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='community_halls', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    size_length = models.FloatField(db_column='SIZE_LENGTH', default=0.0, blank=True, null=True)  # Field name made lowercase.
    size_breadth = models.FloatField(db_column='SIZE_BREADTH', default=0.0, blank=True, null=True)  # Field name made lowercase.
    ceiling_height = models.FloatField(db_column='CEILING_HEIGHT', default=0.0, blank=True, null=True)  # Field name made lowercase.
    timings_open = models.TimeField(db_column='TIMINGS_OPEN', blank=True, null=True)  # Field name made lowercase.
    timings_close = models.TimeField(db_column='TIMINGS_CLOSE', blank=True, null=True)  # Field name made lowercase.
    rentals_current = models.FloatField(db_column='RENTALS_CURRENT', default=0.0, blank=True, null=True)  # Field name made lowercase.
    daily_price_society = models.FloatField(db_column='DAILY_PRICE_SOCIETY', default=0.0, blank=True, null=True)  # Field name made lowercase.
    daily_price_business = models.FloatField(db_column='DAILY_PRICE_BUSINESS', default=0.0, blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(db_column='LOCATION', max_length=50, blank=True, null=True)  # Field name made lowercase.
    furniture_available = models.CharField(db_column='FURNITURE_AVAILABLE', max_length=5, blank=True, null=True)  # Field name made lowercase.
    chair_count = models.IntegerField(db_column='CHAIR_COUNT', blank=True, null=True)  # Field name made lowercase.
    tables_count = models.IntegerField(db_column='TABLES_COUNT', blank=True, null=True)  # Field name made lowercase.
    air_conditioned = models.CharField(db_column='AIR_CONDITIONED', max_length=5, blank=True, null=True)  # Field name made lowercase.
    projector_available = models.CharField(db_column='PROJECTOR_AVAILABLE', max_length=15, blank=True, null=True)  # Field name made lowercase.
    inventory_status = models.CharField(db_column='INVENTORY_STATUS', max_length=15, blank=True, null=True)  # Field name made lowercase.
    sitting = models.IntegerField(db_column='SITTING', blank=True, null=True)  # Field name made lowercase.
    audio_video_display_available = models.CharField(db_column='AUDIO_VIDEO_DISPLAY_AVAILABLE', max_length=5, blank=True, null=True)  # Field name made lowercase.
    electricity_charges_perhour = models.FloatField(db_column='ELECTRICITY_CHARGES_PERHOUR',default=0.0, blank=True, null=True)  # Field name made lowercase.
    notice_board_count_per_community_hall = models.IntegerField(db_column='NOTICE_BOARD_COUNT_PER_COMMUNITY_HALL', blank=True, null=True)  # Field name made lowercase.
    standee_location_count_per_community_hall = models.IntegerField(db_column='STANDEE_LOCATION_COUNT_PER_COMMUNITY_HALL', blank=True, null=True)  # Field name made lowercase.
    stall_count_per_community_hall = models.IntegerField(db_column='STALL_COUNT_PER_COMMUNITY_HALL', blank=True, null=True)  # Field name made lowercase.
    banner_count_per_community_hall = models.IntegerField(db_column='BANNER_COUNT_PER_COMMUNITY_HALL', blank=True, null=True)  # Field name made lowercase.

    class Meta:

        db_table = 'community_hall_info'

class DoorToDoorInfo(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='door_to_doors', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    adinventory_id = models.CharField(db_column='ADINVENTORY_ID', max_length=22, blank=True, null=True)  # Field name made lowercase.
    flier_distribution_frequency_door = models.CharField(db_column='FLIER_DISTRIBUTION_FREQUENCY_DOOR', max_length=20, blank=True, null=True)  # Field name made lowercase.
    door_to_door_inventory_status = models.CharField(db_column='DOOR_TO_DOOR_INVENTORY_STATUS', max_length=15, blank=True, null=True)  # Field name made lowercase.
    door_to_door_price_society = models.FloatField(db_column='DOOR_TO_DOOR_PRICE_SOCIETY', default=0.0, blank=True, null=True)  # Field name made lowercase.
    door_to_door_price_business = models.FloatField(db_column='DOOR_TO_DOOR_PRICE_BUSINESS', default=0.0, blank=True, null=True)  # Field name made lowercase.
    master_door_to_door_flyer_price_society = models.FloatField(db_column='MASTER_DOOR_TO_DOOR_FLYER_PRICE_SOCIETY', default=0.0, blank=True, null=True)  # Field name made lowercase.
    master_door_to_door_flyer_price_business = models.FloatField(db_column='MASTER_DOOR_TO_DOOR_FLYER_PRICE_BUSINESS', default=0.0, blank=True, null=True)  # Field name made lowercase.
    leaflet_handover = models.CharField(db_column='LEAFLET_HANDOVER', max_length=50, blank=True, null=True)  # Field name made lowercase.
    activities = models.CharField(db_column='ACTIVITIES', max_length=255, blank=True, null=True)  # Field name made lowercase.
    banner_spaces_count = models.IntegerField(db_column='BANNER_SPACES_COUNT', blank=True, null=True)  # Field name made lowercase.

    class Meta:

        db_table = 'door_to_door_info'


class LiftDetails(models.Model):

    lift_tag = models.CharField(db_column='LIFT_TAG', max_length=20, blank=True, null=True)  # Field name made lowercase.
    adinventory_id = models.CharField(db_column='ADINVENTORY_ID', max_length=22, blank=True, null=True)  # Field name made lowercase.
    acrylic_board_available = models.CharField(db_column='ACRYLIC_BOARD_AVAILABLE', max_length=5, blank=True, null=True)  # Field name made lowercase.
    lift_location = models.CharField(db_column='LIFT_LOCATION', max_length=100, blank=True, null=True)  # Field name made lowercase.
    total_poster_per_lift = models.IntegerField(db_column='TOTAL_POSTER_PER_LIFT', blank=True, null=True)  # Field name made lowercase.
    lift_lit = models.CharField(db_column='LIFT_LIT', max_length=5, blank=True, null=True)  # Field name made lowercase.
    lift_bubble_wrapping_allowed = models.CharField(db_column='LIFT_BUBBLE_WRAPPING_ALLOWED', max_length=5, blank=True, null=True)  # Field name made lowercase.
    lift_advt_walls_count = models.IntegerField(db_column='LIFT_ADVT_WALLS_COUNT', blank=True, null=True)  # Field name made lowercase.
    photograph_1 = models.CharField(db_column='PHOTOGRAPH_1', max_length=45, blank=True, null=True)  # Field name made lowercase.
    photograph_2 = models.CharField(db_column='PHOTOGRAPH_2', max_length=45, blank=True, null=True)  # Field name made lowercase.
    tower = models.ForeignKey('SocietyTower', related_name='lifts', db_column='TOWER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    inventory_status_lift = models.CharField(db_column='INVENTORY_STATUS_LIFT', max_length=20, blank=True, null=True)  # Field name made lowercase.
    inventory_size = models.CharField(db_column='INVENTORY_SIZE', max_length=30, blank=True, null=True)  # Field name made lowercase.

    def get_tower_name(self):
        try:
            return self.tower.tower_name
        except:
            return None

    class Meta:
        db_table = 'lift_details'


class NoticeBoardDetails(BaseModel):

    notice_board_tag = models.CharField(db_column='NOTICE_BOARD_TAG',max_length=20, blank=True, null=True )  # Field name made lowercase.
    notice_board_type = models.CharField(db_column='NOTICE_BOARD_TYPE', max_length=50, blank=True, null=True)  # Field name made lowercase.
    notice_board_type_other = models.CharField(db_column='NOTICE_BOARD_TYPE_OTHER', max_length=30, blank=True, null=True)  # Field name made lowercase.
    notice_board_location = models.CharField(db_column='NOTICE_BOARD_LOCATION', max_length=100, blank=True, null=True)  # Field name made lowercase.
    total_poster_per_notice_board = models.IntegerField(db_column='TOTAL_POSTER_PER_NOTICE_BOARD', blank=True, null=True)  # Field name made lowercase.
    poster_location_notice_board = models.CharField(db_column='POSTER_LOCATION_NOTICE_BOARD', max_length=5, blank=True, null=True)  # Field name made lowercase.
    notice_board_lit = models.CharField(db_column='NOTICE_BOARD_LIT', max_length=5, blank=True, null=True)  # Field name made lowercase.
    tower = models.ForeignKey('SocietyTower', related_name='notice_boards', db_column='TOWER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    notice_board_size_length = models.FloatField(db_column='NOTICE_BOARD_SIZE_LENGTH', default=0.0, blank=True, null=True)  # Field name made lowercase.
    notice_board_size_breadth = models.FloatField(db_column='NOTICE_BOARD_SIZE_BREADTH', default=0.0, blank=True, null=True)  # Field name made lowercase.
    adinventory_id = models.CharField(db_column='ADINVENTORY_ID', max_length=22, blank=True, null=True)  # Field name made lowercase.

    def get_tower_name(self):
        try:
            return self.tower.tower_name
        except:
            return None

    class Meta:
        db_table = 'notice_board_details'


class SocietyFlat(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    flat_tag = models.CharField(db_column='FLAT_TAG',max_length=20, blank=True, null=True)  # Field name made lowercase.
    tower = models.ForeignKey('SocietyTower', related_name='flats', db_column='TOWER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    flat_type = models.CharField(db_column='FLAT_TYPE', max_length=20)  # Field name made lowercase.
    flat_count = models.IntegerField(db_column='FLAT_COUNT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'society_flat'
        unique_together = (('tower', 'flat_type'),)


class FlatType(BaseModel):

    id = models.AutoField(db_column='ID', primary_key=True)
    society = models.ForeignKey('SupplierTypeSociety', related_name='flatTypes', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    flat_type = models.CharField(db_column='FLAT_TYPE', max_length=20)  # Field name made lowercase.
    flat_count = models.IntegerField(db_column='FLAT_COUNT', blank=True, null=True)  # Field name made lowercase.
    flat_type_count = models.IntegerField(db_column='FLAT_TYPE_COUNT', blank=True, null=True)  # Field name made lowercase.
    size_carpet_area = models.FloatField(db_column='SIZE_CARPET_AREA', blank=True, null=True)  # Field name made lowercase.
    size_builtup_area = models.FloatField(db_column='SIZE_BUILTUP_AREA', blank=True, null=True)  # Field name made lowercase.
    flat_rent = models.IntegerField(db_column='FLAT_RENT', blank=True, null=True)  # Field name made lowercase.
    average_rent_per_sqft = models.FloatField(db_column='AVERAGE_RENT_PER_SQFT', blank=True, null=True)  # Field name made lowercase.
    content_type = models.ForeignKey(ContentType,default=None, null=True)
    object_id = models.CharField(max_length=supplier_id_max_length, null=True)
    content_object = fields.GenericForeignKey('content_type', 'object_id')
    objects = managers.GeneralManager()

    class Meta:
        db_table = 'flat_type'


class SwimmingPoolInfo(models.Model):

    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='swimming_pools', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    size_breadth = models.FloatField(db_column='SIZE_BREADTH', default=0.0, blank=True, null=True)  # Field name made lowercase.
    size_length = models.FloatField(db_column='SIZE_LENGTH', default=0.0, blank=True, null=True)  # Field name made lowercase.
    side_area = models.FloatField(db_column='SIDE_AREA', default=0.0, blank=True, null=True)  # Field name made lowercase.
    side_rentals = models.CharField(db_column='SIDE_RENTALS', max_length=10, blank=True, null=True)  # Field name made lowercase.
    timings_open = models.TimeField(db_column='TIMINGS_OPEN', blank=True, null=True)  # Field name made lowercase.
    timings_close = models.TimeField(db_column='TIMINGS_CLOSE', blank=True, null=True)  # Field name made lowercase.
    daily_price_society = models.FloatField(db_column='DAILY_PRICE_SOCIETY', default=0.0, blank=True, null=True)  # Field name made lowercase.
    daily_price_business = models.FloatField(db_column='DAILY_PRICE_BUSINESS', default=0.0, blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(db_column='LOCATION', max_length=50, blank=True, null=True)  # Field name made lowercase.
    notice_board_count_per_swimming_pool = models.IntegerField(db_column='NOTICE_BOARD_COUNT_PER_SWIMMING_POOL', blank=True, null=True)  # Field name made lowercase.
    standee_location_count_per_swimming_pool = models.IntegerField(db_column='STANDEE_LOCATION_COUNT_PER_SWIMMING_POOL', blank=True, null=True)  # Field name made lowercase.
    stall_count_per_swimming_pool = models.IntegerField(db_column='STALL_COUNT_PER_SWIMMING_POOL', blank=True, null=True)  # Field name made lowercase.
    banner_count_per_swimming_pool = models.IntegerField(db_column='BANNER_COUNT_PER_SWIMMING_POOL', blank=True, null=True)  # Field name made lowercase.
    sitting = models.IntegerField(db_column='SITTING', blank=True, null=True)  # Field name made lowercase.
    inventory_status = models.CharField(db_column='INVENTORY_STATUS', max_length=15, blank=True, null=True)  # Field name made lowercase.
    audio_video_display_available = models.CharField(db_column='AUDIO_VIDEO_DISPLAY_AVAILABLE', max_length=5, blank=True, null=True)  # Field name made lowercase.
    electricity_charges_perhour = models.IntegerField(db_column='ELECTRICITY_CHARGES_PERHOUR', blank=True, null=True)  # Field name made lowercase.
    changing_room_available = models.CharField(db_column='CHANGING_ROOM_AVAILABLE', max_length=5, blank=True, null=True)  # Field name made lowercase.
    lit_unlit = models.CharField(db_column='LIT_UNLIT', max_length=5, blank=True, null=True)  # Field name made lowercase.
    photograph_1 = models.CharField(db_column='PHOTOGRAPH_1', max_length=45, blank=True, null=True)  # Field name made lowercase.
    photograph_2 = models.CharField(db_column='PHOTOGRAPH_2', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:

        db_table = 'swimming_pool_info'

class UserInquiry(models.Model):
    inquiry_id = models.AutoField(db_column='INQUIRY_ID', primary_key=True)  # Field name made lowercase.
    company_name = models.CharField(db_column='COMPANY_NAME', max_length=40)  # Field name made lowercase.
    contact_person_name = models.CharField(db_column='CONTACT_PERSON_NAME', max_length=40, blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='EMAIL', max_length=40, blank=True, null=True)  # Field name made lowercase.
    phone = models.IntegerField(db_column='PHONE', blank=True, null=True)  # Field name made lowercase.
    inquiry_details = models.TextField(db_column='INQUIRY_DETAILS')  # Field name made lowercase.

    class Meta:

        db_table = 'user_inquiry'

class CommonAreaDetails(models.Model):
    common_area_id = models.CharField(db_column='COMMON_AREA_ID', primary_key=True, max_length=20)  # Field name made lowercase.
    pole_count = models.IntegerField(db_column='POLE_COUNT', blank=True, null=True)  # Field name made lowercase.
    street_furniture_count = models.IntegerField(db_column='STREET_FURNITURE_COUNT', blank=True, null=True)  # Field name made lowercase.
    banner_count = models.IntegerField(db_column='BANNER_COUNT', blank=True, null=True)  # Field name made lowercase.
    common_area_stalls_count = models.IntegerField(db_column='COMMON_AREA_STALLS_COUNT', blank=True, null=True)  # Field name made lowercase.
    car_display = models.IntegerField(db_column='CAR_DISPLAY', blank=True, null=True)  # Field name made lowercase.
    wall_count = models.IntegerField(db_column='WALL_COUNT', blank=True, null=True)  # Field name made lowercase.
    major_event_count = models.IntegerField(db_column='MAJOR_EVENT_COUNT', blank=True, null=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='ca', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.

    class Meta:

        db_table = 'common_area_details'

class SocietyMajorEvents(BaseModel):
    id = models.AutoField(db_column='ID', primary_key=True)
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='society_events', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    Ganpati = models.BooleanField(db_column='Ganpati', default=False)
    Diwali = models.BooleanField(db_column='Diwali', default=False)
    Lohri = models.BooleanField(db_column='Lohri', default=False)
    Navratri = models.BooleanField(db_column='Navratri', default=False)
    Holi = models.BooleanField(db_column='Holi', default=False)
    Janmashtami = models.BooleanField(db_column='Janmashtami', default=False)
    IndependenceDay = models.BooleanField(db_column='IndependenceDay', default=False)
    RepublicDay = models.BooleanField(db_column='RepublicDay', default=False)
    SportsDay = models.BooleanField(db_column='SportsDay', default=False)
    AnnualDay = models.BooleanField(db_column='AnnualDay', default=False)
    Christmas = models.BooleanField(db_column='Christmas', default=False)
    NewYear = models.BooleanField(db_column='NewYear', default=False)
    past_major_events = models.IntegerField(db_column='PAST_MAJOR_EVENTS', blank=True, null=True)

class Events(models.Model):
    event_id = models.AutoField(db_column='EVENT_ID', primary_key=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='events', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    event_name = models.CharField(db_column='EVENT_NAME', max_length=20, blank=True, null=True)  # Field name made lowercase.
    event_location = models.CharField(db_column='EVENT_LOCATION', max_length=50, blank=True, null=True)  # Field name made lowercase.
    past_gathering_per_event = models.IntegerField(db_column='PAST_GATHERING_PER_EVENT', blank=True, null=True)  # Field name made lowercase.
    start_day = models.CharField(db_column='START_DAY', max_length=30, blank=True, null=True)  # Field name made lowercase.
    end_day = models.CharField(db_column='END_DAY', max_length=30, blank=True, null=True)
    important_day = models.CharField(db_column='IMPORTANT_DAY', max_length=30, blank=True, null=True)
    activities = models.CharField(db_column='ACTIVITIES', max_length=50, blank=True, null=True)  # Field name made lowercase.
    stall_spaces_count = models.IntegerField(db_column='STALL_SPACES_COUNT', blank=True, null=True)  # Field name made lowercase.
    banner_spaces_count = models.IntegerField(db_column='BANNER_SPACES_COUNT', blank=True, null=True)  # Field name made lowercase.
    poster_spaces_count = models.IntegerField(db_column='POSTER_SPACES_COUNT', blank=True, null=True)  # Field name made lowercase.
    standee_spaces_count = models.IntegerField(db_column='STANDEE_SPACES_COUNT', blank=True, null=True)  # Field name made lowercase.
    event_status = models.CharField(db_column='EVENT_STATUS', max_length=10, blank=True, null=True)  # Field name made lowercase.
    content_type = models.ForeignKey(ContentType, null=True)
    object_id = models.CharField(max_length=supplier_id_max_length, null=True)
    content_object = fields.GenericForeignKey('content_type', 'object_id')
    objects = managers.GeneralManager()

    class Meta:

        db_table = 'events'

# Check whether it is being used or not

class MailboxInfo(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    tower_id = models.CharField(db_column='TOWER_ID', max_length=20, blank=True, null=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='mail_boxes', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    adinventory_id = models.CharField(db_column='ADINVENTORY_ID', max_length=22, blank=True, null=True)  # Field name made lowercase.
    flier_distribution_frequency = models.CharField(db_column='FLIER_DISTRIBUTION_FREQUENCY', max_length=20, blank=True, null=True)  # Field name made lowercase.
    mail_box_inventory_status = models.CharField(db_column='MAIL_BOX_INVENTORY_STATUS', max_length=20, blank=True, null=True)  # Field name made lowercase.
    mailbox_count_per_tower = models.IntegerField(db_column='MAILBOX_COUNT_PER_TOWER', blank=True, null=True)  # Field name made lowercase.
    mailbox_flyer_price_society = models.FloatField(db_column='MAILBOX_FLYER_PRICE_SOCIETY', default=0.0, blank=True, null=True)  # Field name made lowercase.
    mailbox_flyer_price_business = models.FloatField(db_column='MAILBOX_FLYER_PRICE_BUSINESS', default=0.0, blank=True, null=True)  # Field name made lowercase.
    photograph_1 = models.CharField(db_column='PHOTOGRAPH_1', max_length=45, blank=True, null=True)  # Field name made lowercase.
    photograph_2 = models.CharField(db_column='PHOTOGRAPH_2', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:

        db_table = 'mailbox_info'

class OperationsInfo(models.Model):
    operator_id = models.CharField(db_column='OPERATOR_ID', primary_key=True, max_length=10)  # Field name made lowercase.
    operator_name = models.CharField(db_column='OPERATOR_NAME', max_length=100, blank=True, null=True)  # Field name made lowercase.
    operator_email = models.CharField(db_column='OPERATOR_EMAIL', max_length=50, blank=True, null=True)  # Field name made lowercase.
    operator_company = models.CharField(db_column='OPERATOR_COMPANY', max_length=100, blank=True, null=True)  # Field name made lowercase.
    operator_phone_number = models.IntegerField(db_column='OPERATOR_PHONE_NUMBER', blank=True, null=True)  # Field name made lowercase.
    comments_1 = models.CharField(db_column='COMMENTS_1', max_length=500, blank=True, null=True)  # Field name made lowercase.
    comments_2 = models.CharField(db_column='COMMENTS_2', max_length=500, blank=True, null=True)  # Field name made lowercase.
    company_id = models.CharField(db_column='COMPANY_ID', max_length=50, blank=True, null=True)  # Field name made lowercase.
    company_address = models.CharField(db_column='COMPANY_ADDRESS', max_length=250, blank=True, null=True)  # Field name made lowercase.

    class Meta:

        db_table = 'operations_info'

class Signup(models.Model):
    user_id = models.AutoField(db_column='USER_ID', primary_key=True)  # Field name made lowercase.
    first_name = models.TextField(db_column='FIRST_NAME', blank=True, null=True)  # Field name made lowercase.
    email = models.TextField(db_column='EMAIL', blank=True, null=True)  # Field name made lowercase.
    password = models.TextField(db_column='PASSWORD', blank=True, null=True)  # Field name made lowercase.
    login_type = models.TextField(db_column='LOGIN_TYPE', blank=True, null=True)  # Field name made lowercase.
    system_generated_id = models.BigIntegerField(db_column='SYSTEM_GENERATED_ID')  # Field name made lowercase.
    adminstrator_approved = models.CharField(db_column='ADMINSTRATOR_APPROVED', max_length=255, blank=True, null=True)  # Field name made lowercase.
    company_name = models.CharField(db_column='COMPANY_NAME', max_length=255, blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=255, blank=True, null=True)  # Field name made lowercase.
    mobile_no = models.CharField(db_column='MOBILE_NO', max_length=255, blank=True, null=True)  # Field name made lowercase.
    signup_status = models.CharField(db_column='SIGNUP_STATUS', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:

        db_table = 'signup'



class SportsInfra(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    sports_infrastructure_id = models.CharField(db_column='SPORTS_INFRASTRUCTURE_ID', max_length=20, blank=True, null=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='sports', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    stall_spaces_count = models.IntegerField(db_column='STALL_SPACES_COUNT', blank=True, null=True)  # Field name made lowercase.
    banner_spaces_count = models.IntegerField(db_column='BANNER_SPACES_COUNT', blank=True, null=True)
    poster_spaces_count = models.IntegerField(db_column='POSTER_SPACES_COUNT', blank=True, null=True)
    standee_spaces_count = models.IntegerField(db_column='STANDEE_SPACES_COUNT', blank=True, null=True)
    sponsorship_amount_society = models.IntegerField(db_column='SPONSORSHIP_AMOUNT_SOCIETY', blank=True, null=True)
    sponsorship_amount_business = models.IntegerField(db_column='SPONSORSHIP_AMOUNT_BUSINESS)', blank=True, null=True)
    start_date = models.DateField(db_column='START_DATE', blank=True, null=True)
    end_date = models.DateField(db_column='END_DATE', blank=True, null=True)
    outside_participants_allowed = models.CharField(db_column='OUTSIDE_PARTICIPANTS_ALLOWED', max_length=5, blank=True, null=True)
    lit_unlit = models.CharField(db_column='LIT_UNLIT', max_length=5, blank=True, null=True)
    daily_infra_charges_society = models.IntegerField(db_column='DAILY_INFRA_CHARGES_SOCIETY', blank=True, null=True)
    daily_infra_charges_business = models.IntegerField(db_column='DAILY_INFRA_CHARGES_BUSINESS', blank=True, null=True)
    play_areas_count = models.IntegerField(db_column='PLAY_AREAS_COUNT', blank=True, null=True)
    play_area_size = models.IntegerField(db_column='PLAY_AREA_SIZE', blank=True, null=True)
    sports_type = models.CharField(db_column='SPORTS_TYPE', max_length=20, blank=True, null=True)

    class Meta:

        db_table = 'sports_infra'

class CorporateParkCompanyList(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    name = models.CharField(db_column='COMPANY_NAME',max_length=50, blank=True, null=True)
    supplier_id = models.ForeignKey(SupplierTypeCorporate, db_column='CORPORATEPARK_ID', related_name='corporatecompany', blank=True, null=True, on_delete=models.CASCADE)

    def get_company_details(self):
        return self.companydetails.all()

    class Meta:
      db_table = 'corporateparkcompanylist'

class SocietyTower(models.Model):
    tower_id = models.AutoField(db_column='TOWER_ID', primary_key=True)  # Field name made lowercase.
    tower_tag = models.CharField(db_column='TOWER_TAG', max_length=20, blank=True, null=True)  # Field name made lowercase.
    supplier = models.ForeignKey('SupplierTypeSociety', related_name='towers', db_column='SUPPLIER_ID', blank=True, null=True, on_delete=models.CASCADE)  # Field name made lowercase.
    tower_name = models.CharField(db_column='TOWER_NAME', max_length=20, blank=True, null=True)  # Field name made lowercase.
    flat_count_per_tower = models.IntegerField(db_column='FLAT_COUNT_PER_TOWER', blank=True, null=True)  # Field name made lowercase.
    floor_count_per_tower = models.IntegerField(db_column='FLOOR_COUNT_PER_TOWER', blank=True, null=True)  # Field name made lowercase.
    notice_board_count_per_tower = models.IntegerField(db_column='NOTICE_BOARD_COUNT_PER_TOWER', default=0)  # Field name made lowercase.
    standee_location_count_per_tower = models.IntegerField(db_column='STANDEE_LOCATION_COUNT_PER_TOWER', blank=True, null=True)  # Field name made lowercase.
    mailbox_count_per_tower = models.IntegerField(db_column='MAILBOX_COUNT_PER_TOWER', blank=True, null=True)  # Field name made lowercase.
    stall_count_per_tower = models.IntegerField(db_column='STALL_COUNT_PER_TOWER', blank=True, null=True)  # Field name made lowercase.
    tower_location = models.CharField(db_column='TOWER_LOCATION', max_length=100, blank=True, null=True)  # Field name made lowercase.
    tower_resident_count = models.IntegerField(db_column='TOWER_RESIDENT_COUNT', blank=True, null=True)  # Field name made lowercase.
    lift_count = models.IntegerField(db_column='LIFT_COUNT', default=0)  # Field name made lowercase.
    flat_type_count = models.IntegerField(db_column='FLAT_TYPE_COUNT', default=0)  # Field name made lowercase.
    standee_count = models.IntegerField(db_column='STANDEE_COUNT', default=0)  # Field name made lowercase.
    average_rent_per_sqft = models.IntegerField(db_column='AVERAGE_RENT_PER_SQFT', blank=True, null=True)  # Field name made lowercase.
    content_type = models.ForeignKey(ContentType, null=True)
    object_id = models.CharField(max_length=supplier_id_max_length, null=True)
    content_object = fields.GenericForeignKey('content_type', 'object_id')
    objects = managers.GeneralManager()

    def get_notice_board_list(self):
        return self.notice_boards.all()

    def get_lift_list(self):
        return self.lifts.all()

    def get_flat_list(self):
        return self.flats.all()

    def is_notice_board_available(self):
        notice_board = self.get_notice_board_list()
        if notice_board and len(notice_board) > 0 :
            return True
        return False

    def is_lift_available(self):
        lift = self.get_lift_list()
        if lift and len(lift) > 0:
            return True
        return False

    def is_flat_available(self):
        flat = self.get_flat_list()
        if flat and len(flat) > 0:
            return True
        return False

    class Meta:

        db_table = 'society_tower'
        unique_together = (('tower_tag','supplier'),)

class BusinessTypes(BaseModel):
    id              = models.AutoField(db_column='ID', primary_key=True)
    business_type   = models.CharField(db_column='BUSINESS_TYPE', max_length=100, blank=True)
    business_type_code = models.CharField(db_column='TYPE_CODE',unique=True, max_length=4, blank=True, null=True)

    def __str__(self):
        return self.business_type

    def __unicode__(self):
        return self.business_type

    class Meta:
        #db_table = 'BUSINESS_TYPES'
        db_table = 'business_types'

class BusinessSubTypes(BaseModel):
    id = models.AutoField(db_column='ID', primary_key=True)
    business_type = models.ForeignKey(BusinessTypes, related_name='business_subtypes', db_column='BUSINESS_TYPE',
                                      null=True, on_delete=models.CASCADE)  ## changed -> business
    business_sub_type = models.CharField(db_column='SUBTYPE', max_length=100, blank=True)
    business_sub_type_code = models.CharField(db_column='SUBTYPE_CODE', max_length=3, blank=True, null=True)

    def __str__(self):
        return self.business_sub_type

    def __unicode__(self):
        return self.business_sub_type

    class Meta:
        db_table = 'business_subtypes'



# class ProposalInfo(models.Model):
#     proposal_id         = models.CharField(db_column = 'PROPOSAL ID',max_length=15,primary_key=True)
#     account             = models.ForeignKey(AccountInfo,related_name='proposals', db_column ='ACCOUNT',on_delete=models.CASCADE)
#     name                = models.CharField(db_column='NAME', max_length=50,blank=True)
#     payment_status      = models.BooleanField(default=False, db_column='PAYMENT STATUS')
#     updated_on          = models.DateTimeField(auto_now=True, auto_now_add=False)
#     updated_by          = models.CharField(max_length=50,default='Admin')
#     created_on          = models.DateTimeField(auto_now_add=True,auto_now=False)
#     created_by          = models.CharField(max_length=50, default='Admin')
#     tentative_cost      = models.IntegerField(default=5000)
#     tentative_start_date = models.DateTimeField(null=True)
#     tentative_end_date  = models.DateTimeField(null=True)
#
#     def get_centers(self):
#         # ProposalCenterMapping --> related_name='centers'
#         try:
#             return self.centers.all()
#         except:
#             return None
#
#     def get_proposal_versions(self):
#         return self.proposal_versions.all().order_by('-timestamp')
#
#     class Meta:
#
#         #db_table = 'PROPOSAL_INFO'
#         db_table = 'proposal_info'



# class AccountContact(models.Model):
#     id = models.AutoField(db_column='ID', primary_key=True)
#     name = models.CharField(db_column='NAME', max_length=50, blank=True)
#     designation = models.CharField(db_column='DESIGNATION', max_length=20, blank=True)
#     department = models.CharField(db_column='DEPARTMENT', max_length=20, blank=True)
#     phone = models.CharField(db_column='PHONE', max_length=10,  blank=True)
#     email = models.CharField(db_column='EMAILID',  max_length=50, blank=True)
#     account = models.ForeignKey(AccountInfo, related_name='contacts', db_column='ACCOUNT_ID', null=True, on_delete=models.CASCADE)
#     spoc = models.BooleanField(db_column='SPOC', default=False)
#     comments = models.TextField(db_column='COMMENTS',  max_length=100, blank=True)


#     class Meta:
#
#         #db_table = 'PROPOSAL_INFO'
#         db_table = 'proposal_info'

#         db_table = 'account_contact'


#
# class ShortlistedSpaces(models.Model):
#     space_mapping   = models.ForeignKey(SpaceMapping,db_index=True, related_name='spaces',on_delete=models.CASCADE)
#     supplier_code   = models.CharField(max_length=4)
#     content_type    = models.ForeignKey(ContentType, related_name='spaces')
#     object_id       = models.CharField(max_length=12)
#     content_object  = fields.GenericForeignKey('content_type', 'object_id')
#     buffer_status   = models.BooleanField(default=False)
#
#     class Meta:
#         #db_table = 'SHORTLISTED_SPACES'
#         db_table = 'shortlisted_spaces'


class ShortlistedSpacesVersion(models.Model):
    space_mapping_version   = models.ForeignKey(SpaceMappingVersion,db_index=True, related_name='spaces_version',on_delete=models.CASCADE)
    supplier_code   = models.CharField(max_length=4)
    content_type    = models.ForeignKey(ContentType, related_name='spaces_version')
    object_id       = models.CharField(max_length=12)
    content_object  = fields.GenericForeignKey('content_type', 'object_id')
    buffer_status   = models.BooleanField(default=False)

    class Meta:
        #db_table = 'SHORTLISTED_SPACES_VERSION'
        db_table = 'shortlisted_spaces_version'

class FlatTypeCode(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    flat_type_name = models.CharField(db_column='FLAT_TYPE_NAME', max_length=20, null=True)
    flat_type_code = models.CharField(db_column='FLAT_TYPE_CODE', max_length=5, null=True)

    class Meta:

        db_table = 'flat_type_code'

class CorporateBuilding(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    building_name = models.CharField(db_column='BUILDING_NAME', max_length=50, null=True, blank=True)
    number_of_wings = models.IntegerField(db_column='NUMBER_OF_WINGS', null=True, blank=True)
    corporatepark_id = models.ForeignKey(SupplierTypeCorporate,db_index=True, db_column='CORPORATE_ID',related_name='corporatebuilding', blank=True, null=True, on_delete=models.CASCADE)

    def get_wings(self):
        return self.buildingwing.all()

    class Meta:
        db_table='corporate_building'


class CorporateBuildingWing(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    wing_name = models.CharField(db_column='WING_NAME', max_length=50, null=True, blank=True)
    number_of_floors = models.IntegerField(db_column='NUMBER_OF_FLOORS', null=True, blank=True)
    building_id = models.ForeignKey('CorporateBuilding',db_index=True, db_column='BUILDING_ID',related_name='buildingwing', blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        db_table='corporate_building_wing'

# class CorporateCompany(models.Model):
#     id = models.AutoField(db_column='ID', primary_key=True)
#     company_name = models.CharField(db_column='COMPANY_NAME',max_length=50,blank=True,null=True)
#     corporatepark_id = models.ForeignKey(SupplierTypeCorporate, db_column='CORPORATEPARK_NAME', related_name='corporatecompany', blank=True, null=True, on_delete=models.CASCADE)

#     class Meta:
#         db_table='corporate_company'


class CorporateCompanyDetails(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    company_id = models.ForeignKey('CorporateParkCompanyList', db_column='COMPANY_ID', related_name='companydetails', blank=True, null=True, on_delete=models.CASCADE)
    building_name = models.CharField(db_column='BUILDING_NAME', max_length=20, blank=True, null=True)
    wing_name = models.CharField(db_column='WING_NAME', max_length=20, blank=True, null=True)

    def get_floors(self):
        return self.wingfloor.all()

    class Meta:
        db_table='corporate_company_details'


class CompanyFloor(models.Model):
    company_details_id = models.ForeignKey('CorporateCompanyDetails',db_column='COMPANY_DETAILS_ID',related_name='wingfloor', blank=True, null=True, on_delete=models.CASCADE)
    floor_number = models.IntegerField(db_column='FLOOR_NUMBER', blank=True, null=True)

    class Meta:
        db_table='corporate_building_floors'


class SocietyLeads(models.Model):
    id = models.CharField(max_length=100,null=False,primary_key=True)
    society = models.ForeignKey('SupplierTypeSociety', null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15, null=True, blank=True,default='0')
    email = models.EmailField()

    class Meta:
        db_table = 'society_leads'


# this is giving problems
class ShortlistedInventoryPricingDetails(BaseModel):
    """
    Model for storing calculated price and count of an inventory for a given supplier.
    A particular inventory type is identified by it's content_type_id.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID)
    inventory_content_type = models.ForeignKey(ContentType, null=True, blank=True)
    inventory_id = models.CharField(max_length=255, null=True, blank=True)
    inventory_price = models.FloatField(default=0.0, null=True)
    inventory_count = models.IntegerField(default=0, null=True)
    factor = models.IntegerField(default=0.0, null=True)
    ad_inventory_type = models.ForeignKey('AdInventoryType', null=True)
    ad_inventory_duration = models.ForeignKey('DurationType', null=True)
    release_date = models.DateTimeField(null=True, blank=True)
    closure_date = models.DateTimeField(null=True, blank=True)
    shortlisted_spaces = models.ForeignKey('ShortlistedSpaces', null=True, blank=True)
    objects = managers.GeneralManager()
    inventory_object = fields.GenericForeignKey('inventory_content_type', 'inventory_id')
    comment = models.CharField(max_length=1000, null=True, blank=True)


    class Meta:
        db_table = 'shortlisted_inventory_pricing_details'





class Filters(BaseModel):
    """
    Stores all kinds of filters and there respective codes. Filters are used when you filter all the suppliers
    on the basis of what inventories you would like to have in there, etc. because different suppliers can have
    different types of filters, we have content_type field for capturing that. These filters are predefined in constants
    and are populated from there.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID)
    center = models.ForeignKey('ProposalCenterMapping', null=True, blank=True)
    proposal = models.ForeignKey('ProposalInfo', null=True, blank=True)
    supplier_type = models.ForeignKey(ContentType, null=True, blank=True)
    filter_name = models.CharField(max_length=255, null=True, blank=True)
    filter_code = models.CharField(max_length=255, null=True, blank=True)
    is_checked = models.BooleanField(default=False)
    supplier_type_code = models.CharField(max_length=255, null=True, blank=True)
    objects = managers.GeneralManager()

    class Meta:
        db_table = 'filters'

class ShortlistedSpaces(BaseModel):
    """
    This model stores all the shortlisted spaces. One Supplier or space can be under different campaigns.
    in one campaign it's status can be removed while in the other it's buffered. Hence this model is made
    for mapping such relations.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID)
    space_mapping = models.ForeignKey(SpaceMapping, db_index=True, related_name='spaces', on_delete=models.CASCADE, null=True, blank=True)
    center = models.ForeignKey('ProposalCenterMapping', null=True, blank=True)
    proposal = models.ForeignKey('ProposalInfo', null=True, blank=True)
    supplier_code = models.CharField(max_length=4, null=True, blank=True)
    content_type = models.ForeignKey(ContentType, related_name='spaces')
    object_id = models.CharField(max_length=supplier_id_max_length)
    content_object = fields.GenericForeignKey('content_type', 'object_id')
    buffer_status = models.BooleanField(default=False)
    status = models.CharField(max_length=10, null=True, blank=True)
    objects = managers.GeneralManager()
    campaign_status = models.CharField(max_length=10, default='', null=True, blank=True)
    phase = models.CharField(max_length=10, default='',  null=True, blank=True)
    payment_status = models.CharField(max_length=255, null=True, blank=True)
    payment_method = models.CharField(max_length=255, null=True, blank=True)
    total_negotiated_price = models.CharField(max_length=255, null=True, blank=True)
    booking_status = models.CharField(max_length=10, null=True, blank=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        db_table = 'shortlisted_spaces'

class Lead(BaseModel):
    """
    A model to store the leads data. This user is different django from auth_user. it's a 'lead'.
    """
    email = models.EmailField(primary_key=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    gender = models.CharField(max_length=255, null=True, blank=True)
    age = models.FloatField(null=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    lead_type = models.CharField(max_length=255, null=True, blank=True)
    lead_status = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'lead'


class CampaignLeads(BaseModel):
    """
    a campaign can have multiple leads. a lead can go in multiple campaigns.
    campaign stores the campaign id.
    lead stores the lead id
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID)
    campaign_id = models.IntegerField(default=0)
    lead_email = models.EmailField(default='')
    comments = models.CharField(max_length=255, null=True)
    objects = managers.GeneralManager()

    class Meta:
        db_table = 'campaign_leads'
        unique_together = (('campaign_id', 'lead_email'),)

class GenericExportFileName(BaseModel):
    """
    This model stores file name generated by GenericExport API.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID)
    business = models.ForeignKey('BusinessInfo', null=True, blank=True)
    organisation = models.ForeignKey(Organisation, null=True, blank=True)
    account = models.ForeignKey('AccountInfo', null=True, blank=True)
    proposal = models.ForeignKey('ProposalInfo', null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    file_name = models.CharField(max_length=1000, null=True, blank=True)
    is_exported = models.BooleanField(default=True)
    objects = managers.GeneralManager()

    @property
    def calculate_assignment_detail(self):
        """
        This method is a property which just calculates to whom this proposal was being assigned while converting it to a
        campaign. This can be used as a field in a serializer class.
        """
        try:
            instance = CampaignAssignment.objects.get(campaign=self.proposal)
            # can use caching here to avoid BaseUser calls.
            return {
                'assigned_by': BaseUser.objects.get(pk=instance.assigned_by.pk).username,
                'assigned_to': BaseUser.objects.get(pk=instance.assigned_to.pk).username
            }
        except ObjectDoesNotExist:
            return {
                'assigned_by': 'Nobody',
                'assigned_to': 'Nobody'
            }

    class Meta:
        db_table = 'generic_export_file_name'

# class ShortlistedInventoryDetails(BaseModel):
#     """
#     This table stores information about Release Date, Audit Date, and Campaign Dates associated with each inventory_id
#     under each campaign. All inventories within this table are booked.Campaign is nothing but Proposal_id with is_campaign = True
#     """
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID)
#     inventory_content_type = models.ForeignKey(ContentType, null=True, blank=True)
#     inventory_id = models.CharField(max_length=255, null=True, blank=True)
#     campaign_id = models.ForeignKey(ProposalInfo, null=True, blank=True)
#     release_date = models.DateTimeField(default=timezone.now())
#     closure_date = models.DateTimeField(default=timezone.now())
#     factor = models.IntegerField(default=0.0, null=True)
#     center = models.ForeignKey('ProposalCenterMapping')
#     ad_inventory_type = models.ForeignKey('AdInventoryType', null=True)
#     ad_inventory_duration = models.ForeignKey('DurationType', null=True)
#     inventory_price = models.FloatField(default=0.0, null=True)
#     shortlisted_spaces = models.ForeignKey(ShortlistedSpaces, null=True, blank=True)
#     objects = managers.GeneralManager()
#

class Amenity(BaseModel):
    """
    Stores individual amenities. There basic details.
    """
    name = models.CharField(max_length=1000)
    code = models.CharField(max_length=1000, null=True, blank=True)

    class Meta:
        db_table = 'amenities'

class Profile(BaseModel):
    """
    This model describes profile. a user can only have one profile.
    """
    name = models.CharField(max_length=255)
    organisation = models.ForeignKey('Organisation')
    is_standard = models.BooleanField(default=False)

    class Meta:
        db_table = 'profile'


class ObjectLevelPermission(models.Model):
    """
    This class grants access  Read, Update, View, ViewAll, and UpdateAll on each object it's tied to.
    """
    name = models.CharField(max_length=255)
    codename = models.CharField(max_length=50)
    content_type = models.ForeignKey(ContentType)
    view = models.BooleanField(default=False)
    update = models.BooleanField(default=False)
    create = models.BooleanField(default=False)
    delete = models.BooleanField(default=False)
    view_all = models.BooleanField(default=False)
    update_all = models.BooleanField(default=False)
    description = models.CharField(max_length=1000, null=True, blank=True)
    profile = models.ForeignKey(Profile)

    class Meta:
        db_table = 'object_level_permission'


class GeneralUserPermission(BaseModel):
    """
    This class defines all the possible functions in website and tells weather that is allowed/not allowed for a profile
    """
    name = models.CharField(max_length=255)
    codename = models.CharField(max_length=50)
    description = models.CharField(max_length=1000, null=True, blank=True)
    is_allowed = models.BooleanField(default=False)
    profile = models.ForeignKey(Profile)

    class Meta:
        db_table = 'general_user_permission'

class Role(models.Model):
    """
    This model defines roles
    """
    name = models.CharField(max_length=255)
    codename = models.CharField(max_length=255)
    organisation = models.ForeignKey('Organisation')

    class Meta:
        db_table = 'role'

class RoleHierarchy(models.Model):
    """
    This model defines role hierarchy between roles
    """
    parent = models.ForeignKey('Role', related_name='parent')
    child = models.ForeignKey(Role)
    depth = models.IntegerField(default=0, null=False, blank=False)

    class Meta:
        db_table = 'role_hierarchy'

class Leads(BaseModel):
    """
    This model defines Leads
    """
    campaign = models.ForeignKey('ProposalInfo', null=False, blank=False)
    content_type = models.ForeignKey(ContentType, null=True)
    object_id = models.CharField(max_length=supplier_id_max_length)
    content_object = fields.GenericForeignKey('content_type', 'object_id')
    objects = managers.GeneralManager()
    firstname1 = models.CharField(max_length=20, blank=True, null=True)
    lastname1 = models.CharField(max_length=20, blank=True, null=True)
    firstname2 = models.CharField(max_length=20, blank=True, null=True)
    lastname2 = models.CharField(max_length=20, blank=True, null=True)
    mobile1 = models.BigIntegerField(blank=True, null=True)
    mobile2 = models.BigIntegerField(blank=True, null=True)
    phone = models.BigIntegerField(blank=True, null=True)
    email1 = models.EmailField(max_length=50, blank=True, null=True)
    email2 = models.EmailField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    alphanumeric1 = models.CharField(max_length=50, null=True, blank=True)
    alphanumeric2 = models.CharField(max_length=50, null=True, blank=True)
    alphanumeric3 = models.CharField(max_length=50, null=True, blank=True)
    alphanumeric4 = models.CharField(max_length=50, null=True, blank=True)
    boolean1 = models.BooleanField(default=False)
    boolean2 = models.BooleanField(default=False)
    boolean3 = models.BooleanField(default=False)
    boolean4 = models.BooleanField(default=False)
    float1 = models.FloatField(null=True, blank=True)
    float2 = models.FloatField(null=True, blank=True)
    number1 = models.IntegerField(null=True, blank=True)
    number2 = models.IntegerField(null=True, blank=True)
    date1 = models.DateField(null=True, blank=True)
    date2 = models.DateField(null=True, blank=True)
    is_from_sheet = models.BooleanField(default=False)
    is_interested = models.BooleanField(default=False)
    class Meta:
        db_table = 'leads'

class LeadAlias(BaseModel):
    """
    This model defines aliases of leads model fields
    """
    campaign = models.ForeignKey('ProposalInfo', null=False, blank=False)
    original_name = models.CharField(max_length=255, null=False, blank=False)
    alias = models.CharField(max_length=255, null=False, blank=False)

    class Meta:
        db_table = 'lead_alias'