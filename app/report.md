---
title: ORMA Dataflow
---

### Introduction

People capture insights about road quality infrastructure using many different denominators and data formats. Being open and able to ingest these different data is challenging, yet crucial to ensure ORMA allows policy makers to be ever more informed when making decision about road infrastructure.

To this end, Development Seed has devised a high level structure for data pipelines that feed into the ORMA database. This high level pipeline follows the following three steps:

    1. Match outside data to OpenStreetMap XML data model for ease of import into ORMA db
    2. Systemically conflate new data with existing ORMA data using the Java OpenStreetMap Editor
    3. Push changes to the ORMA db via the ORMA API

     The remainder of this document gives a more detailed overview of these pipeline components as well as details how they can be applied to individual ORMA data pipelines

### General dataflow

  1. #### Match outside data to OpenStreetMap XML data mode

  Matching outside data to the OpenStreetMap data model, which ORMA uses, is paramount.
  It ensures incorporating new data sources is standardized, ORMA maintainers can use the vast number of open tools that exist for converting data to OSM complaint formats, and that the API’s jobs remain simple.

  While conversion methods are germain to the outside data source of interest, when moving data sent to the ORMA database should be one of two types part of the OSM data model:

      - Discrete nodes that represent measurements taken along roads
      - Discrete ways that represent the roads themselves with ROADs complaint road quality attribute

  2. #### Conflate outside data geometries and attributes with existing ORMA data

      After standardizing outside data, it needs to be conflated with the existing database. Two data characteristics can be conflated - attributes and geometry. Geometry conflation is to match then merge new data source geometries into the existing database. Attributes conflation is to map all new attributes from outside data to corresponding data within the existing database.

      Conflation is necessary to make sure that new data does not duplicate information existing in the database, new roads attributes are not overlooked because new and existing data have matching geometry, and that wholly new roads are topologically integrated with the existing road network.

       Since the outside data sources are many, conflation needs to be standardized and use a tool built for such a systemic approach. As such, conflation should follow the below steps and make use of the Java OpenStreetMap Editor (JOSM for short).

        1. Using JOSM’s search functionality, find each of the classes within the attribute ‘mappable’ to the ROADs class for road quality and ‘map’ them to their corresponding ROADs class


        2. For example when working with a RoadLab dataset that includes 13 Roads defined as ‘poor’, 10 as Fair, and 15 as Good, use JOSM to select all of these roads, then make use of the ‘find in selection’ tool to isolate all ‘poor’, ‘fair’, and ‘good’ roads, followed by mapping them to the equivalent ROADs standard class.


        3. Within JOSM, make a task list for each of the data points in the outside data source using the ‘TODO’ plugin. Then follow the next two steps for each of the data points.


          - Conflate attributes and geometries for each data point.

          - Using the todo list, inspect the geometry and attributes of each data point and make the following two judgements


          - First, decide if the new dataset road matches that of an existing dataset in the database. If it does, do not bring the new geometry into the database. If the data sets don’t match, copy the new source into the existing db and connect it to the road network accordingly (using the underlying satellite imagery as guidance)


          - If the new data matches existing data, compare the attributes of both. If the new data has a different road quality attribute that is authoritative either because it is newer, or the person doing the conflation has additional information to suggest the outside data is truest to the road quality, copy the new data attributes into the existing data.


          - Upon conflation, use JOSM’s validation tool to ensure conflation did not lead to any unintended/improper changes to the database.



      3. . #### Upload to the db using the ORMA API

        After conflation, and assurance that changes will not be problematic in the ORMA database, upload changes into the database.



The way in which each of the new data sources of interest will fit into this general data model is as follows.
