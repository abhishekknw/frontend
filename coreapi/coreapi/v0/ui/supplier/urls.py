from django.conf.urls import url

from rest_framework.routers import DefaultRouter

from views import SocietyDataImport

urlpatterns = [
    url(r'^society-data-import-excel/$', SocietyDataImport.as_view())
]

from views import TransactionDataImport

urlpatterns = [
    url(r'^society-transaction-data-import-excel/$', TransactionDataImport.as_view())
]