---
title: FHIR Festival
date: "2022-01-27"
description: "Healthcare data"
---

[HL7 FHIR](http://hl7.org/fhir/summary.html) is an interoperability standard for healhcare data

## Background

How hosipals and insurance worked in the dark days and how it does now
$$
\sigma_i = \theta
$$


A centeral challenge for healthcare standards is how to handle the wide variability cased by diverse healthcare processes. Over time more fields and specifctions are added 

FHIR solves this challenge by defining a simple framework for extending the existing resources and describing their use with Profiles. All systems can read all resources, but applications can add more control and meaning using profiles.  

## What is FHIR like

FHIR solutions are built from a set of modular components called "Resources". FHIR is suitable for use in a wide variety of contexts – mobile phone apps, cloud communications, EHR-based data sharing, server communication in large institutional healthcare providers, ect.

Has a strong foundation in web standars 

Human-readable serilizaion format

![img](/Users/seanwade/projects/PulsHealth/pulshealth/content/blog/FHIR/example_fhir_resource.png)

and example in JSON

```json
{
  "resourceType": "Patient",
  "id" : "23434",
  "meta" : {
    "versionId" : "12",
    "lastUpdated" : "2014-08-18T15:43:30Z"
  }
  "text": {
    "status": "generated",
    "div": "<!-- Snipped for Brevity -->"
  },
  "extension": [
    {
      "url": "http://example.org/consent#trials",
      "valueCode": "renal"
    }
  ],
  "identifier": [
    {
      "use": "usual",
      "label": "MRN",
      "system": "http://www.goodhealth.org/identifiers/mrn",
      "value": "123456"
    }
  ],
  "name": [
    {
      "family": [
        "Levin"
      ],
      "given": [
        "Henry"
      ],
      "suffix": [
        "The 7th"
      ]
    }
  ],
  "gender": {
    "text": "Male"
  },
  "birthDate": "1932-09-24",
  "active": true
```





### Framework

All resources have the following features in [common](http://hl7.org/fhir/resource.html):

- A URL that identifies the resource
- Common metadata
- A [human-readable XHTML summary](http://hl7.org/fhir/narrative.html)
- A set of defined data elements - a different set for each type of resource 
- An [extensibility framework](http://hl7.org/fhir/extensibility.html) to support variation in healthcare

Resource instances are represented as either [XML](http://hl7.org/fhir/xml.html), [JSON](http://hl7.org/fhir/json.html) or [RDF](http://hl7.org/fhir/rdf.html) and there are currently 145 different [resource types defined](http://hl7.org/fhir/resourcelist.html) in the FHIR specification.