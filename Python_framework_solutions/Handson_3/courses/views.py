from django.shortcuts import render
from django.http import HttpResponse

def hello_view(request):
    """Simple function-based view checking system operational readiness."""
    return HttpResponse('Course Management API is running')

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Department, Course, Student, Enrollment
from .serializers import DepartmentSerializer, CourseSerializer, StudentSerializer, EnrollmentSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        """Custom endpoint returning all students enrolled in a specific course."""
        course = self.get_object()
        enrollments = Enrollment.objects.filter(course=course)
        students = [e.student for e in enrollments]
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer