SELECT h.*,
CASE WHEN rank IS NOT NULL THEN true ELSE false END as complete,
CASE 
  WHEN 
    (hl.date_completed IS NOT NULL AND now()::date - hl.date_completed > h.reminder) 
      OR 
    (hl.date_completed IS NULL AND now()::date - h.created_at > h.reminder) 
    THEN true ELSE false 
  END as notification 
  FROM habit h 
  LEFT JOIN (SELECT hl.*, rank() OVER (PARTITION BY hl.habit_id ORDER BY date_completed DESC) FROM habit_log hl) hl on hl.habit_id = h.id 
WHERE h.user_id = $1
AND (hl.rank = 1 OR hl.rank IS NULL); 