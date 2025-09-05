USE [TravelTracker]
GO

/****** Object:  UserDefinedFunction [dbo].[fncGetDaysTripEnd]    Script Date: 9/5/2025 1:52:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[fncGetDaysTripEnd] (@toDate DATETIME)
RETURNS INT
AS
BEGIN
	
	DECLARE @today DATETIME = GETDATE()
	DECLARE @clockstartDate DATETIME = DATEADD(hh, 24, @toDate)

	RETURN IIF(DATEDIFF(dd, @clockStartDate, @today) > 0, DATEDIFF(dd, @clockStartDate, @today), NULL)
END

GO

