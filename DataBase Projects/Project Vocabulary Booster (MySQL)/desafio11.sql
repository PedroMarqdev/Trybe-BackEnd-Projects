SELECT 
t1.ContactName AS `Nome`,
t1.Country AS `País`,
COUNT(t1.Country ) AS `Número de compatriotas`
FROM w3schools.customers AS t1, w3schools.customers AS t2
WHERE t2.Country = t1.Country AND t1.ContactName <> t2.ContactName
GROUP BY t1.CustomerID
ORDER BY t1.ContactName;
