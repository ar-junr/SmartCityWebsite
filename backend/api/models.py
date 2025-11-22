from django.db import models
from rest_framework import serializers
from django.utils import timezone
from simple_history.models import HistoricalRecords
import re
from django.dispatch import receiver
from django.db.models.signals import post_delete

from django.db import models

class Career(models.Model):
    no = models.PositiveIntegerField(unique=True, default=1)
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='Published')
    pdf = models.FileField(upload_to='careers/', blank=True, null=True)
    posted_on = models.DateField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    last_date_to_apply = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.title

class CareerResource(models.Model):
    career = models.ForeignKey(Career, related_name='resources', on_delete=models.CASCADE)
    label = models.CharField(max_length=255, help_text="Description like 'Notification', 'Apply Here', etc.")
    pdf = models.FileField(upload_to='career_resources/', blank=True, null=True)
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.label} - {self.career.title}"

class Tender(models.Model):
    no = models.CharField(max_length=100, default='TEMP_NO')
    title = models.CharField(max_length=255)
    pdf = models.FileField(upload_to='tenders/')
    last_date_to_submit = models.DateTimeField(
        default=timezone.now,
        help_text="Deadline (date & time) to submit the tender"
    )

    def __str__(self):
        return self.title

    @property
    def status(self):
        return 'Closed' if timezone.now() > self.last_date_to_submit else 'Open'

    class Meta:
        ordering = ['-last_date_to_submit']


class TimeStampedModel(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    description = models.TextField()
    image = models.ImageField(upload_to='events/')
    source = models.CharField(max_length=255, blank=True)
    link = models.URLField(blank=True)

    class Meta:
        abstract = True

class News(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateTimeField()
    excerpt = models.TextField()
    source = models.CharField(max_length=100)
    link = models.URLField()
    image = models.ImageField(upload_to='news/')
    type = models.CharField(max_length=100, default="news")
    def __str__(self):
        return self.title

# Conclave Speakers


class ConclaveSpeaker(models.Model):
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    image = models.ImageField(upload_to="conclave/speakers/")
    def __str__(self):
        return self.name

# Conclave Recording


class ConclaveRecording(models.Model):
    title = models.CharField(max_length=255)
    date = models.CharField(max_length=100)
    youtube_link = models.URLField()
    def __str__(self):
        return self.title

# Anniversary Image


class AnniversaryImage(models.Model):
    image = models.ImageField(upload_to="anniversary/")
    alt = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return self.alt or "Anniversary Image"

class InaugurationImage(models.Model):
    image = models.ImageField(upload_to="inauguration/")
    alt = models.CharField(max_length=255)
    def __str__(self):
        return self.alt

class NewsSerializer(serializers.ModelSerializer):
    formatted_date = serializers.DateTimeField(
        source='date', format="%B %d, %Y %I:%M %p")
    class Meta:
        model = News
        fields = ['id', 'title', 'formatted_date',
                  'excerpt', 'source', 'link', 'image', 'type']

class GovernmentOrder(models.Model):
    title = models.TextField()
    date = models.DateField()
    pdf = models.FileField(upload_to='govt_orders/')

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    history = HistoricalRecords()
    def __str__(self):
        return f"Message from {self.name} ({self.email})"

class Complaint(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    project = models.CharField(max_length=255)
    complaint = models.TextField()
    attachment = models.FileField(
        upload_to='complaints/', null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.name} - {self.project}"


class PollFeedback(models.Model):
    CHOICES = (
        ('nice', 'Nice'),
        ('medium', 'Medium'),
        ('bad', 'Bad'),
    )
    rating = models.CharField(max_length=10, choices=CHOICES)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.rating

class MonthlyProgressReport(models.Model):
    month = models.CharField(max_length=100)
    year = models.IntegerField()  # NEW FIELD
    file = models.FileField(upload_to='mpr_reports/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.month} {self.year}"

class Internship(models.Model):
    STATUS_CHOICES = (
        ('Open', 'Open'),
        ('Closed', 'Closed'),
    )
    post = models.CharField(max_length=255)
    title = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    date = models.CharField(max_length=255, blank=True)
    pdf_link = models.FileField(
        upload_to='internships/', blank=True, null=True)
    external_url = models.URLField(blank=True, null=True)  # Optional for links
    def __str__(self):
        return self.post

class PhotoAlbum(models.Model):
    title = models.CharField(max_length=255)
    thumbnail = models.ImageField(upload_to='gallery/thumbnails/')
    def __str__(self):
        return self.title

class Photo(models.Model):
    album = models.ForeignKey(
        PhotoAlbum, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery/photos/')
    caption = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return f"{self.album.title} - {self.caption or 'Image'}"

class Video(models.Model):
    title = models.CharField(max_length=255)
    youtube_url = models.URLField("YouTube Video URL")
    @property
    def youtube_id(self):
        # Extract video ID from various YouTube URL formats
        match = re.search(
            r"(?:v=|youtu\.be/|embed/)([a-zA-Z0-9_-]{11})", self.youtube_url)
        return match.group(1) if match else ""
    def __str__(self):
        return self.title

class MediaItem(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    image = models.ImageField(upload_to='media_images/', null=True, blank=True)
    description = models.TextField(blank=True) 

    def __str__(self):
        return self.title

class EventItem(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    image = models.ImageField(upload_to='event_images/', null=True, blank=True)
    description = models.TextField(blank=True)
    def __str__(self):
        return self.title

class ContactInfo(models.Model):
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    address = models.TextField()
    def __str__(self):
        return "Contact Info"

class BoardMember(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    field = models.CharField(max_length=200, blank=True) 
    image = models.ImageField(
        upload_to='board_members/') 
    def __str__(self):
        return self.name

class CEO(models.Model):
    name = models.CharField(max_length=255)
    joining_date = models.DateField()
    relieving_date = models.DateField(blank=True, null=True)
    def __str__(self):
        joining = self.joining_date.strftime('%d-%m-%Y')
        relieving = self.relieving_date.strftime('%d-%m-%Y') if self.relieving_date else "Present"
        return f"{self.name} ({joining} to {relieving})"

class Staff(models.Model):
    CATEGORY_CHOICES = [
        ("Team", "Team"),
        ("Technical Team", "Technical Team"),
        ("Administration Team", "Administration Team"),
        ("PIU Team", "PIU Team"),
        ("Site Engineers", "Site Engineers"),
    ]
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    email = models.EmailField()
    image = models.ImageField(
        upload_to="staff_images/", default="staff_images/default.jpg")
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="Executive Leadership"
    )
    phone = models.CharField(max_length=20, blank=True, null=True)
    qualifications = models.TextField(blank=True, null=True)
    experience = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class Document(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents/')
    def __str__(self):
        return self.title

class Official(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='officials/')
    linkedin = models.URLField(blank=True, null=True)
    priority = models.PositiveIntegerField(default=0)  
    def __str__(self):
        return self.name

class ProjectCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class OngoingProject(models.Model):
    project_id = models.CharField(max_length=50, unique=True)
    project_name = models.TextField()
    scm = models.DecimalField(max_digits=10, decimal_places=2)  # ₹ in Cr
    target_completion = models.DateField()
    def __str__(self):
        return f"{self.project_id} - {self.project_name}"

class ProjectImage(models.Model):
    project = models.ForeignKey(OngoingProject, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='ongoing_projects/')
    caption = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return f"{self.caption or 'Image'} for {self.project.project_id}"
    
class CompletedProject(models.Model):
    project_name = models.CharField(max_length=255, blank=True, null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.project_name or "Unnamed Project"

class CompletedProjectImage(models.Model):
    project = models.ForeignKey(CompletedProject, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='completed_projects/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"Image for {self.project.project_name}"
    
class NavigationItem(models.Model):
    name = models.CharField(max_length=100, unique=True)
    href = models.CharField(max_length=255, blank=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='dropdown')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class PageContent(models.Model):
    navigation_item = models.OneToOneField(NavigationItem, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='page_images/', blank=True, null=True)
    pdf = models.FileField(upload_to='page_pdfs/', blank=True, null=True)
    message = models.TextField(blank=True)
    def __str__(self):
        return f'Content for {self.navigation_item.name}'

class Visitor(models.Model):
    count = models.PositiveIntegerField(default=0)