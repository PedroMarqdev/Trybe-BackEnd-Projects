SELECT j.JOB_TITLE AS Cargo, 
(SELECT ROUND(AVG(SALARY), 2) FROM hr.employees WHERE j.JOB_ID = JOB_ID) AS 'Média salarial',
(SELECT CASE
WHEN ROUND(AVG(SALARY), 2) BETWEEN 2000 AND 5800 THEN 'Júnior'
WHEN ROUND(AVG(SALARY), 2) BETWEEN 5801 AND 7500 THEN 'Pleno'
WHEN ROUND(AVG(SALARY), 2) BETWEEN 7501 AND 10500 THEN 'Sênior'
ELSE 'CEO'
END FROM hr.employees WHERE j.JOB_ID = JOB_ID) AS Senioridade
FROM hr.jobs as j ORDER BY `Média Salarial`, JOB_TITLE;
