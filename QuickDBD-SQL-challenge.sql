-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/rlVJT6
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "State" (
    "index" int   NOT NULL,
    "type" varchar   NOT NULL,
    "coordinates" text   NOT NULL,
    "state" varchar   NOT NULL,
    "total_votes20" float   NOT NULL,
    "votes20_donald_trump" float   NOT NULL,
    "votes20_joe_biden" float   NOT NULL,
    "cases" int   NOT NULL,
    "deaths" int   NOT NULL,
    "totalpop" int   NOT NULL,
    "votingagecitizen" int   NOT NULL,
    "men" float   NOT NULL,
    "women" float   NOT NULL,
    "hispanic" float   NOT NULL,
    "white" float   NOT NULL,
    "black" float   NOT NULL,
    "native" float   NOT NULL,
    "asian" float   NOT NULL,
    "pacific" float   NOT NULL,
    "biden" float   NOT NULL,
    "trump" float   NOT NULL,
    "republican" boolean   NOT NULL,
    "democrat" boolean   NOT NULL,
    "hispanic_pop" float   NOT NULL,
    "white_pop" float   NOT NULL,
    "black_pop" float   NOT NULL,
    "native_pop" float   NOT NULL,
    "asian_pop" float   NOT NULL,
    "pacific_pop" float   NOT NULL,
    "cases_per_100k" float   NOT NULL,
    "deaths_per_100k" float   NOT NULL
);

