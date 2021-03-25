from django.urls import path

from covidapp import views

urlpatterns = [
    path('covidtest/', views.CovidTestBlockchainView),
    path('covidtestconsulta/', views.CovidTestBlockchainCall),
    path('send/', views.SmartConsentBlockchainView),
    path('call/', views.SmartConsenttBlockchainCall),
 
]