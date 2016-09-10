from django.conf.urls import include, url
from v0.ui import views
# from v0.ui.website import views as web_views

urlpatterns = [

    url(r'^website/', include('v0.ui.website.urls')),

    # url(r'^website/create_business/load_business_types/',web_views.getBusinessTypesAPIView.as_view()),
    # url(r'^website/subtypes/(?P<id>[A-Z_a-z0-9]+)/$', web_views.getBusinessSubTypesAPIView.as_view()),

    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/tower/$', views.TowerAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/flat/$', views.FlatTypeAPIView.as_view()),
    #url(r'^society/(?P<id>[A-Z_a-z0-9]+)/tower/(?P<tower_id>[A-Z_a-z0-9]+)$', views.TowerAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)$', views.SocietyAPIView.as_view()),
    url(r'^society/$', views.SocietyAPIView.as_view()),
    url(r'^society/list/$', views.SocietyAPIListView.as_view()),
    url(r'^corporate/list/$', views.CorporateAPIListView.as_view()),
    url(r'^salon/list/$', views.SalonAPIListView.as_view()),
    url(r'^gym/list/$', views.GymAPIListView.as_view()),
    url(r'^society/filter/$', views.SocietyAPIFiltersView.as_view()),
    url(r'^society/filterList/$', views.SocietyAPIFiltersListView.as_view()),
    url(r'^society/filterSubArea/$',views.SocietyAPIFilterSubAreaView.as_view(),),
    url(r'^societyList/sortedSocieties/$',views.SocietyAPISortedListView.as_view()),
    url(r'^society/societyIds/$', views.SocietyAPISocietyIdsView.as_view()),

    #url(r'^society/(?P<id>[A-Z_a-z0-9]+)/car_display/$', views.CarDisplayAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/other_inventory/$', views.OtherInventoryAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/events/$', views.EventAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/inventory_summary/$', views.InventorySummaryAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/basic_pricing/$', views.BasicPricingAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/fliers/$', views.FlierAPIView.as_view()),
    #url(r'^society/(?P<id>[A-Z_a-z0-9]+)/posters/$', views.PosterAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/standee_banners/$', views.StandeeBannerAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/stalls/$', views.StallAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/inventory_pricing/$', views.InventoryPricingAPIView.as_view()),

    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/image_locations/$', views.ImageLocationsAPIView.as_view()),
    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/image_mapping/$', views.ImageMappingAPIView.as_view()),

    url(r'^create_supplier/load_initial_data/$', views.getInitialDataAPIView.as_view()),
    url(r'^(?P<id>[A-Z_a-z0-9]+)/load_initial_data_corporate/$', views.saveBasicCorporateDetailsAPIView.as_view()),
    url(r'^locations/(?P<id>[A-Z_a-z0-9]+)/$', views.getLocationsAPIView.as_view()),
    url(r'^supplier/generate_id/$', views.generateSupplierIdAPIView.as_view()),
    url(r'^check_supplier_code/(?P<code>[A-Z0-9]+)$', views.checkSupplierCodeAPIView.as_view()),

    url(r'^society/(?P<id>[A-Z_a-z0-9]+)/posters/$', views.PosterAPIView.as_view()),

    url(r'^user_profiles/$', views.UsersProfilesAPIView.as_view()),
    url(r'^user_profiles/(?P<id>[A-Z_a-z0-9]+)$', views.getUserData.as_view()),
    url(r'^users/delete/$', views.deleteUsersAPIView.as_view()),

    url(r'^corporate/(?P<id>[A-Z_a-z0-9]+)/save_basic_corporate_details$', views.saveBasicCorporateDetailsAPIView.as_view()),
    # url(r'^corporate/(?P<id>[A-Z_a-z0-9]+)/save_contact_details$', views.ContactDetailsGenericAPIView.as_view()),
    # url(r'^corporate/save_basic_corporate_details$', views.saveBasicCorporateDetailsAPIView.as_view())
    url(r'^corporate/(?P<id>[A-Z_a-z0-9]+)/save_building_details$', views.saveBuildingDetailsAPIView.as_view()),
    url(r'^corporate/(?P<id>[A-Z_a-z0-9]+)/get_company_list$', views.CompanyDetailsAPIView.as_view()),
    url(r'^corporate/(?P<id>[A-Z_a-z0-9]+)/save_company_details$', views.CorporateCompanyDetailsAPIView.as_view()),
    url(r'^corporate/(?P<id>[A-Z_a-z0-9]+)/get_company_data$', views.CorporateCompanyDetailsAPIView.as_view()),

    url(r'^salon/(?P<id>[A-Z_a-z0-9]+)/save_basic_salon_details$', views.saveBasicSalonDetailsAPIView.as_view()),
    url(r'^(?P<id>[A-Z_a-z0-9]+)/load_initial_data_salon/$', views.saveBasicSalonDetailsAPIView.as_view()),

    url(r'^gym/(?P<id>[A-Z_a-z0-9]+)/save_basic_gym_details$', views.saveBasicGymDetailsAPIView.as_view()),
    url(r'^(?P<id>[A-Z_a-z0-9]+)/load_initial_data_gym/$', views.saveBasicGymDetailsAPIView.as_view()),
]