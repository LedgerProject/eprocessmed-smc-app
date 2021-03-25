from rest_framework import serializers
from .models import Testcovid
from .models import SmartConsentModel

class TestcovidSerializers(serializers.ModelSerializer):
    class Meta:
        model = Testcovid
        fields = '__all__'


class smartConsentSerializers(serializers.ModelSerializer):
    class Meta:
        model = SmartConsentModel
        fields = '__all__'