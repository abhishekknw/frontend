from django.contrib import admin


from v0.models import Business, BusinessContact, BusinessTypes, BusinessSubTypes, Account, InventoryLocation, ImageMapping 


class ImageMappingAdmin(admin.ModelAdmin):
	list_display = ['supplier','location_id','location_type']
	search_fields = ['supplier__supplier_code','supplier__society_zip','supplier__society_name','location_type','location_id']

	class Meta:
		model = ImageMapping

admin.site.register(ImageMapping,ImageMappingAdmin)


class InventoryLocationAdmin(admin.ModelAdmin):
	list_display = ['location_id','location_type']
	search_fields = ['location_id','location_type']

	class Meta:
		model = InventoryLocation

admin.site.register(InventoryLocation, InventoryLocationAdmin)


class BusinessAdmin(admin.ModelAdmin):
	list_display = ['name', 'type', 'sub_type', 'email' ]
	search_fields = ['name','type','sub_type']	

	class Meta:
		model = Business

admin.site.register(Business, BusinessAdmin)


class BusinessContactAdmin(admin.ModelAdmin):
	list_display = ['name','designation','department','phone']
	search_fields = ['name','designation','spoc']

	class Meta:
		model = BusinessContact

admin.site.register(BusinessContact, BusinessContactAdmin)


class BusinessTypesAdmin(admin.ModelAdmin):
	list_display = ['id','type_name']
	search_fields = ['id','type_name']

	class Meta:
		model = BusinessTypes

admin.site.register(BusinessTypes, BusinessTypesAdmin)


class BusinessSubTypesAdmin(admin.ModelAdmin):
	list_display = ['id','business_type','sub_type']
	search_fields = ['id','business_type__type_name','sub_type']

	class Meta:
		model = BusinessSubTypes

admin.site.register(BusinessSubTypes, BusinessSubTypesAdmin)


class AccountAdmin(admin.ModelAdmin):
	list_display = ['name','phone','email']
	search_fields = ['name','phone','email']

	class Meta:
		model = Account

admin.site.register(Account, AccountAdmin)