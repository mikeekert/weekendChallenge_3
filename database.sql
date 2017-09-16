-- CREATE TABLE
CREATE TABLE "public"."weekend3" (
    "id" serial,
    "name" text NOT NULL,
    "complete" boolean NOT NULL DEFAULT 'false',
    PRIMARY KEY ("id")
);

