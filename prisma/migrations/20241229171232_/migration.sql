-- AlterTable
CREATE SEQUENCE tags_id_seq;
ALTER TABLE "tags" ALTER COLUMN "id" SET DEFAULT nextval('tags_id_seq');
ALTER SEQUENCE tags_id_seq OWNED BY "tags"."id";
