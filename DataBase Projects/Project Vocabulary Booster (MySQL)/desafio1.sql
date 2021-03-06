SELECT c.COUNTRY_NAME  AS País, IF(l.REGION_NAME = 'Europe', 'incluído', 'não incluído') AS 'Status Inclusão' FROM hr.countries AS c
INNER JOIN hr.regions AS l ON
c.REGION_ID = l.REGION_ID
ORDER BY c.COUNTRY_NAME;
