from rest_framework import viewsets, permissions
from django.conf import settings
from .filters import PublicationFilter, ResearchProjectFilter
from .models import Researcher, ResearchProject, Publication
from .serializers import ResearcherSerializer, ResearchProjectSerializer, PublicationSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import AccessToken

class ResearcherViewSet(viewsets.ModelViewSet):
    queryset = Researcher.objects.all()
    serializer_class = ResearcherSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] 
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()

    def update(self, request, *args, **kwargs): 
        self.check_permissions(request)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super().destroy(request, *args, **kwargs)

class ResearchProjectViewSet(viewsets.ModelViewSet):
    queryset = ResearchProject.objects.all()
    serializer_class = ResearchProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_class = ResearchProjectFilter
    
    def create(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super().destroy(request, *args, **kwargs)

class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_class = PublicationFilter
    
    def create(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super().destroy(request, *args, **kwargs)


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=response.data['access'],
            httponly=True,
            secure=settings.DEBUG,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            samesite='Strict'
        )
        return response

@api_view(['GET'])
@permission_classes([AllowAny])
def get_token(request):
    access_token = AccessToken.for_user(request.user)
    response = JsonResponse({'access': 'Bearer ' + str(access_token)})
    response.set_cookie('access_token', 'Bearer ' + str(access_token), httponly=True)
    return response
