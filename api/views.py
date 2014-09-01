from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from reviews.models import Review
import json
from django.core import serializers

def api(request):
    return render(request, 'api/api.html')

def reviews(request):
    dump = {}
    for feed in feeds:
        dump[feed.pk] = {'likes': feed.likes, 'comments': feed.comments}
    data = json.dumps(dump)
    return HttpResponse(data, content_type='application/json')

def review(request, username, review_name):
    review = Review.objects.get(name=review_name, author__username__iexact=username)
    dump = {
        'id': review.pk,
        'name': review.name,
        'title': review.title,
        'description': review.description,
        'author': review.author.username,
        'create_date': review.create_date.strftime('%d/%m/%Y'),
        'last_update': review.last_update.strftime('%d/%m/%Y'),
        'objective': review.objective,
        'status': review.status,
        'quality_assessment_cutoff_score': review.quality_assessment_cutoff_score,
        'study_selection_strategy': review.study_selection_strategy,
        'quality_assessment_strategy': review.quality_assessment_strategy,
        'data_extraction_strategy': review.data_extraction_strategy,
        'population': review.population,
        'intervention': review.intervention,
        'comparison': review.comparison,
        'outcome': review.outcome,
        'context': review.context
    }
    data = json.dumps(dump)
    return HttpResponse(data, content_type='application/json')