SELECT 
UPPER(CONCAT(FIRST_NAME, ' ', LAST_NAME)) AS `Nome completo`,
jh.START_DATE AS `Data de início`,
e.SALARY AS `Salário`
FROM hr.employees AS e
INNER JOIN hr.jobs AS j ON
e.JOB_ID = j.JOB_ID
INNER JOIN hr.job_history AS jh ON
jh.EMPLOYEE_ID = e.EMPLOYEE_ID
WHERE MONTH(jh.START_DATE) BETWEEN 1 AND 3
ORDER BY `Nome completo`, `Data de início`
