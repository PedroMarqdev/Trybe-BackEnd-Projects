USE hr;

DELIMITER $$

CREATE PROCEDURE buscar_media_por_cargo(IN cargo VARCHAR(25))
BEGIN
SELECT ROUND(AVG(SALARY), 2) AS `Média salarial` FROM hr.employees AS e
INNER JOIN hr.jobs AS j ON
j.JOB_ID = e.JOB_ID
WHERE j.JOB_TITLE = cargo;
END$$

DELIMITER ;
