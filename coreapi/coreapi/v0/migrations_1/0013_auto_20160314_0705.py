# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('v0', '0012_auto_20160308_1349'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='campaignsuppliertypes',
            table='campaign_supplier_types',
        ),
    ]