USE hr;

DELIMITER $$

CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(email VARCHAR(100))
RETURNS INT READS SQL DATA
BEGIN
DECLARE quantidade_emprego INT;
SELECT COUNT(e.EMPLOYEE_ID) AS `total_empregos` FROM hr.employees AS e
INNER JOIN hr.job_history AS h ON
e.EMPLOYEE_ID = h.EMPLOYEE_ID
WHERE e.EMAIL = email
GROUP BY h.EMPLOYEE_ID INTO quantidade_emprego;
RETURN quantidade_emprego;
END$$

DELIMITER ;
