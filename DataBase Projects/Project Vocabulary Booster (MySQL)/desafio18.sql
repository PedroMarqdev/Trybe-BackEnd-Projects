SELECT 
CONCAT(e.FIRST_NAME, ' ', e.LAST_NAME) AS 'Nome completo',
CONCAT(DATE_FORMAT(j.START_DATE, '%d'), '/', DATE_FORMAT(j.START_DATE, '%m'), '/', YEAR(j.START_DATE)) AS 'Data de início',
CONCAT(DATE_FORMAT(j.END_DATE, '%d'), '/', DATE_FORMAT(j.END_DATE,'%m'), '/', YEAR(j.END_DATE)) AS 'Data de rescisão',
ROUND(TIMESTAMPDIFF(DAY, j.START_DATE, j.END_DATE) / 365, 2) AS 'Anos trabalhados'
FROM hr.employees AS e
INNER JOIN hr.job_history AS j ON
e.EMPLOYEE_ID = j.EMPLOYEE_ID
ORDER BY `Nome completo`, `Anos trabalhados`;
