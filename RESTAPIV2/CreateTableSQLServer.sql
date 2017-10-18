/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2012 (11.0.6594)
    Source Database Engine Edition : Microsoft SQL Server Express Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2012
    Target Database Engine Edition : Microsoft SQL Server Express Edition
    Target Database Engine Type : Standalone SQL Server
*/

USE [TESTINGNPMWRITEBACK]
GO

ALTER TABLE [dbo].[UP_SAVED_STATE] DROP CONSTRAINT [DF_UP_SAVED_STATE_INSERTDATETIME]
GO

/****** Object:  Table [dbo].[UP_SAVED_STATE]    Script Date: 10/17/2017 4:28:33 PM ******/
DROP TABLE [dbo].[UP_SAVED_STATE]
GO

/****** Object:  Table [dbo].[UP_SAVED_STATE]    Script Date: 10/17/2017 4:28:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UP_SAVED_STATE](
	[ID_COLUMN] [int] IDENTITY(1,1) NOT NULL,
	[USERNAME] [nvarchar](100) NOT NULL,
	[PATH] [nvarchar](max) NULL,
	[OBJECTSTRING] [nvarchar](max) NULL,
	[INSERTDATETIME] [datetime2](7) NULL,
	[OBJECTNAME] [nvarchar](100) NULL,
	[STATEID] [nvarchar](500) NULL,
	[STATEID_DESCR] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_COLUMN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[UP_SAVED_STATE] ADD  CONSTRAINT [DF_UP_SAVED_STATE_INSERTDATETIME]  DEFAULT (getdate()) FOR [INSERTDATETIME]
GO


