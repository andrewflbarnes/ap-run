# andrewandpenny.run

This is a minimal static website for whatever big run Penny and I have planned (if any!).

The page gives a description of the challenge at the top, a link to a donation page, strava
widgets to track training and a table of the current sweepstake.

There is also a sticky footer donation button.

### Local deployment

Start the mock sweepstake server
```bash
npm -i -g json-server
cd mock && json-server
```

Then open static/index.html in your favourite browser - simples :)

At the moment this relies on penny-guess (pennyguess.com) to provide the /api/sweepstake endpoint.

This is backed by the below DB table
```sql
CREATE
 TABLE t_aprun_sweepstake
     ( id            SERIAL          PRIMARY KEY
     , entry_time    TIMESTAMP       DEFAULT NOW()
     , name          VARCHAR(255)    NOT NULL
     , runner        VARCHAR(255)    NOT NULL
     , time          VARCHAR(8)      NOT NULL
     , message       VARCHAR(255)
     , contact       VARCHAR(255)
     , CONSTRAINT t_aprun_sweepstake_unq_name_runner UNIQUE (name, runner)
     )
;

CREATE OR REPLACE
  VIEW aprun_sweepstake AS
SELECT t_aprun_sweepstake.id
     , t_aprun_sweepstake.entry_time
     , t_aprun_sweepstake.name
     , t_aprun_sweepstake.runner
     , t_aprun_sweepstake."time"
     , t_aprun_sweepstake.message
     , t_aprun_sweepstake.contact
  FROM t_aprun_sweepstake
```