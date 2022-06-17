---
title: Exporting Apple HealthKit Data
date: "2022-01-27"
description: "Methods for how to get health data from Apple watch and iPhone"
---

[HealthKit](https://developer.apple.com/documentation/healthkit) is the api for working with health data 

You are able to export all your health data from the Health app. To do so

1. Open the app
2. Go to profile
3. Click **Export all Health Data**

Then in a couple minutes it will prepare your data in XML format. In the mean time what is XML?

## Understanding XML

XML stands for eXtensible Markup Language. It is for ___ and very similar to HTML. Essetially it is just a very flexible way to represent structured information. You can create any elemt tag you want (unlike HTML), for example

```xml
<letter>
	<to>Alex</to>
  <from>Sean</from>
  <title>Love letter</title>
  <body>This is a love letter</body>
</letter>
```

## Health XML

Once the export completes you recieve an `export.zip` file that contanins

- clinical-records
- electocardiograms
- workout-routs
- export_cda.xml
- export.xml


