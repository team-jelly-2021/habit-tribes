CREATE TABLE public.users (
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"phone_number" varchar,
	"timezone" timestamptz NOT NULL,
	"darkmode_setting" BOOLEAN NOT NULL DEFAULT 'true',
  "profile_pic_filename" varchar,
	CONSTRAINT "users_pk" PRIMARY KEY ("email")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.habits (
	"name" varchar NOT NULL,
	CONSTRAINT "habits_pk" PRIMARY KEY ("name")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "public"."habit";
CREATE SEQUENCE IF NOT EXISTS habit_id_seq;
CREATE TABLE "public"."habit" (
    "id" int4 NOT NULL DEFAULT nextval('habit_id_seq'::regclass),
    "name" varchar NOT NULL,
    "user_id" varchar NOT NULL,
    "created_at" date NOT NULL DEFAULT now(),
    "frequency" varchar,
    "reminder" int4,
    "private" bool NOT NULL DEFAULT false,
    "next_reminder" date,
    "video_name" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."habit_log";
CREATE SEQUENCE IF NOT EXISTS habit_log_id_seq;
CREATE TABLE "public"."habit_log" (
    "id" int4 NOT NULL DEFAULT nextval('habit_log_id_seq'::regclass),
    "habit_id" int4 NOT NULL,
    "date_completed" date DEFAULT now(),
    "metadata" json,
    PRIMARY KEY ("id")
);

CREATE TABLE public.users_habits_join (
	"_id" serial NOT NULL,
	"users_id" varchar NOT NULL,
	"habits_id" varchar NOT NULL,
	"habits_start_day" bigint NOT NULL,
	"habit_frequency" bigint DEFAULT '1',
	"days_missed_until_reminder" bigint DEFAULT '2',
	"days_missed" bigint DEFAULT '0',
	"days_since_missed" bigint DEFAULT '0',
	"total_days_achieved" bigint DEFAULT '0',
	"benchmark" bigint,
  "completed_today" BOOLEAN NOT NULL DEFAULT 'false',
	"habit_is_private" BOOLEAN DEFAULT 'false',
	"text_notifications_setting" BOOLEAN DEFAULT 'true',
	"push_notifications_setting" BOOLEAN DEFAULT 'true',
	CONSTRAINT "users_habits_join_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.friends (
	"_id" serial NOT NULL,
	"friend_a" varchar NOT NULL,
	"friend_b" varchar NOT NULL,
	"request_accepted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "friends_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.user_habit_calendar (
	"_id" serial NOT NULL,
	"user_habits_join_id" bigint NOT NULL,
	"days_since_launch" bigint NOT NULL,
	CONSTRAINT "user_habit_calendar_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.videos (
	"recorded_by_id" varchar NOT NULL,
	"recorded_for_id" varchar,
	"filename" varchar NOT NULL,
	"send_when" varchar DEFAULT 'slacking',
  "watched" boolean DEFAULT 'false',
	"habits_id" varchar NOT NULL,
	CONSTRAINT "videos_pk" PRIMARY KEY ("filename")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.today (
	"today" bigint DEFAULT 0,
	CONSTRAINT "today_pk" PRIMARY KEY ("today")
) WITH (
  OIDS=FALSE
);

CREATE TABLE user_cache (
    "uid" character varying PRIMARY KEY,
    "full_name" character varying,
    "email" character varying
);

ALTER TABLE public.users_habits_join ADD CONSTRAINT "users_habits_join_fk0" FOREIGN KEY ("users_id") REFERENCES "users"("email");
ALTER TABLE public.users_habits_join ADD CONSTRAINT "users_habits_join_fk1" FOREIGN KEY ("habits_id") REFERENCES "habits"("name");

ALTER TABLE public.friends ADD CONSTRAINT "friends_fk0" FOREIGN KEY ("friend_a") REFERENCES "user_cache"("uid");
ALTER TABLE public.friends ADD CONSTRAINT "friends_fk1" FOREIGN KEY ("friend_b") REFERENCES "user_cache"("uid");

ALTER TABLE public.user_habit_calendar ADD CONSTRAINT "user_habit_calendar_fk0" FOREIGN KEY ("user_habits_join_id") REFERENCES "users_habits_join"("_id");

ALTER TABLE public.videos ADD CONSTRAINT "videos_fk0" FOREIGN KEY ("recorded_by_id") REFERENCES "users"("email");
ALTER TABLE public.videos ADD CONSTRAINT "videos_fk1" FOREIGN KEY ("recorded_for_id") REFERENCES "users"("email");
ALTER TABLE public.videos ADD CONSTRAINT "videos_fk2" FOREIGN KEY ("habits_id") REFERENCES "habits"("name");
