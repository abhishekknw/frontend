from v0 import managers
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from v0.ui.location.models import City, CityArea


class BaseUser(AbstractUser):
    """
    This is base user class that inherits AbstractBaseUser and adds an additional field.
    """
    user_code = models.CharField(max_length=255, default=settings.DEFAULT_USER_CODE)
    mobile = models.CharField(max_length=20, null=True, blank=True)
    profile = models.ForeignKey('Profile', null=True, blank=True)  # remove null=true once every user has been attached one profile
    role = models.ForeignKey('Role', null=True, blank=True)

    class Meta:
        db_table = 'base_user'


class UserProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID,  unique=True, editable=True, null=False, related_name='user_profile', db_column='user_id', on_delete=models.CASCADE)
    is_city_manager = models.BooleanField(db_column='is_city_manager', default=False)
    is_cluster_manager = models.BooleanField(db_column='is_cluster_manager', default=False)
    is_normal_user =  models.BooleanField(db_column='is_normal_user', default=False)
    society_form_access = models.BooleanField(db_column='society_form_access', default=False)
    corporate_form_access = models.BooleanField(db_column='corporate_form_access', default=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, db_column='created_by', null=True)
    objects = managers.GeneralManager()

    def get_user(self):
        return self.user

    class Meta:
        db_table = 'user_profile'


class UserCities(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID,  related_name='cities', db_column='user_id', null=False, on_delete=models.CASCADE)
    city = models.ForeignKey(City, db_column='city_id', null=True, on_delete=models.CASCADE)

    class Meta:
        db_table = 'user_cities'


class UserAreas(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=settings.DEFAULT_USER_ID, related_name='clusters', db_column='user_id', null=False, on_delete=models.CASCADE)
    area = models.ForeignKey(CityArea, db_column='area_id', on_delete=models.CASCADE)

    class Meta:
        db_table = 'user_areas'