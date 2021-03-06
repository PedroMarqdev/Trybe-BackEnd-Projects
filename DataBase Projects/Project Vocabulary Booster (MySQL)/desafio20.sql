USE hr;

DELIMITER $$

CREATE PROCEDURE exibir_historico_completo_por_funcionario(IN email VARCHAR(100))
BEGIN
SELECT
CONCAT(e.FIRST_NAME, ' ', e.LAST_NAME) AS 'Nome completo',
d.DEPARTMENT_NAME AS 'Departamento',
j.JOB_TITLE AS 'Cargo'
FROM hr.job_history AS h
INNER JOIN hr.employees AS e ON
h.EMPLOYEE_ID = e.EMPLOYEE_ID
INNER JOIN hr.departments AS d ON
h.DEPARTMENT_ID = d.DEPARTMENT_ID
INNER JOIN hr.jobs AS j ON
j.JOB_ID = h.JOB_ID
WHERE e.EMAIL = email
ORDER BY `Departamento`, `Cargo`;
END $$

DELIMITER ;
