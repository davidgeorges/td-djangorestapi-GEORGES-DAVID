from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ResearcherViewSet, ResearchProjectViewSet, PublicationViewSet, get_token

router = DefaultRouter()
router.register(r'chercheurs', ResearcherViewSet)
router.register(r'projets', ResearchProjectViewSet)
router.register(r'publications', PublicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('getToken/', get_token, name='get_token'),

]
