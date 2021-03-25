from django.db import models

class Testcovid(models.Model):
    patient = models.CharField(max_length=100)
    pdf     = models.CharField(max_length=100)
    specialist  = models.CharField(max_length=100)
    pcr      = models.CharField(max_length=100)
    creation_date   = models.CharField(max_length=100)

    def __str__(self):
        return self.patient

class SmartConsentModel(models.Model):
    idb = models.CharField(max_length = 100)
    field1 = models.TextField()
    field2 = models.TextField()
    field3 = models.TextField()
    field4 = models.TextField()
    creation_date   = models.CharField(max_length=100)

    def __str__(self):
        return self.idb