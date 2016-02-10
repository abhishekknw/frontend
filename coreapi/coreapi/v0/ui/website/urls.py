from django.conf.urls import include, url
from v0.ui.website import views

urlpatterns = [


    url(r'^businesses/$', views.BusinessAPIListView.as_view()),
    url(r'^business/(?P<id>[A-Z_a-z0-9]+)$', views.BusinessAPIView.as_view()),
    url(r'^newCampaign/$', views.NewCampaignAPIView.as_view()),

]
