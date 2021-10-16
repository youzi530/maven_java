CREATE DATABASE crm;

USE crm;

-- (角色表)
CREATE TABLE role (
	permission VARCHAR (10) PRIMARY KEY COMMENT '权限',
	department VARCHAR (10) NOT NULL COMMENT '部门'
);

-- (用户基本信息表)
CREATE TABLE userInfo (
	userId INT auto_increment,
	account VARCHAR (100) NOT NULL,
	PASSWORD VARCHAR (100) NOT NULL,
	realName VARCHAR (100) NOT NULL,
	sex VARCHAR (10) NOT NULL,
	mobile VARCHAR (11) NOT NULL,
	email VARCHAR (100) NOT NULL,
	birthday VARCHAR (100) NOT NULL,
	identity VARCHAR (18) COMMENT '身份证号',
	entryTime VARCHAR (100) COMMENT '入职日期',
	roleId VARCHAR (10) NOT NULL,
	STATUS VARCHAR (10) DEFAULT '试用期' COMMENT '试用期 正式员工 离职',
	createTime VARCHAR (100) NOT NULL,
	CONSTRAINT userId_pk PRIMARY KEY (userId),
	CONSTRAINT account_uk UNIQUE (account),
	CONSTRAINT roleId_fk FOREIGN KEY (roleId) REFERENCES role (permission)
);

-- 客户信息表
CREATE TABLE clientInfo (
	clientId INT auto_increment PRIMARY KEY,
	userId INT COMMENT '负责客户的员工外键',
	department VARCHAR (10) DEFAULT '客户部门' COMMENT '负责客户的员工部门',
	clientName VARCHAR (100) NOT NULL,
	workAddress VARCHAR (100) NOT NULL,
	mainPhone VARCHAR (100) NOT NULL,
	zipCode VARCHAR (100) NOT NULL,
	email VARCHAR (100),
	industry VARCHAR (100) COMMENT '所属行业',
	province VARCHAR (100),
	city VARCHAR (100),
	town VARCHAR (100),
	rank INT DEFAULT 1 COMMENT '1：潜在客户2：合作伙伴3：忠实客户4：代理商5：战略合作',
	creditGrade INT DEFAULT 1 COMMENT '分五级用★表示',
	creditLimit INT DEFAULT 1 COMMENT '分五级最少0元',
	superCompany VARCHAR (100) COMMENT '上级单位',
	financePhone VARCHAR (100) COMMENT '财务电话',
	companyHome VARCHAR (100) COMMENT '公司主页',
	register VARCHAR (100) COMMENT '注册时间',
	remark VARCHAR (100) COMMENT '备注信息',
	receiveId INT DEFAULT NULL COMMENT '转手给其他职员，由上级分配',
	receiveState INT DEFAULT 0 COMMENT '0：未转交1：申请转交2：转交成功3：转交失败',
	deployState VARCHAR (10) DEFAULT 1 COMMENT '开始接收 工作准备 洽谈中 合同完成/失败',
	approveId INT DEFAULT NULL COMMENT '外键审批人id主管',
	STATUS INT DEFAULT 0 COMMENT '0：活跃客户1：跟进客户2：流失客户',
	createTime VARCHAR (100) NOT NULL COMMENT '数据录入时间',
	updTime VARCHAR (100) DEFAULT NULL COMMENT '数据修改时间',
	CONSTRAINT userId_fk FOREIGN KEY (userId) REFERENCES userInfo (userId),
	CONSTRAINT receiveId_fk FOREIGN KEY (receiveId) REFERENCES userInfo (userId),
	CONSTRAINT approveId_fk FOREIGN KEY (approveId) REFERENCES userInfo (userId)
);

-- 联系记录表
CREATE TABLE contactRecord (
	id INT auto_increment PRIMARY KEY,
	linkmanId INT NOT NULL,
	clientId INT NOT NULL,
	content VARCHAR (100) NOT NULL COMMENT '联系内容',
	contactTime VARCHAR (100) NOT NULL COMMENT '联系时间',
	createTime VARCHAR (100) NOT NULL COMMENT '创建时间',
	CONSTRAINT linkmanId_fk FOREIGN KEY (linkmanId) REFERENCES userInfo (userId),
	CONSTRAINT clientId_fk FOREIGN KEY (clientid) REFERENCES clientInfo (clientId)
);

-- 联系人信息表
CREATE TABLE linkmanInfo (
	id INT auto_increment PRIMARY KEY,
	clientName VARCHAR (100) NOT NULL,
	linkmanName VARCHAR (100) NOT NULL,
	sex VARCHAR (10) NOT NULL,
	age INT NOT NULL,
	department VARCHAR (100) NOT NULL,
	duty VARCHAR (100) NOT NULL,
	superCharge VARCHAR (100) NOT NULL,
	workPhone VARCHAR (100) NOT NULL,
	mobile VARCHAR (100) NOT NULL,
	birthday VARCHAR (100) NOT NULL,
	hobby VARCHAR (100),
	remark VARCHAR (100)
);

-- 供应商表
DROP TABLE supplier;

CREATE TABLE supplier (
	sid INT auto_increment PRIMARY KEY,
	sName VARCHAR (100) NOT NULL,
	nature VARCHAR (100) NOT NULL COMMENT '企业属性',
	mainProduct VARCHAR (100) NOT NULL,
	phone VARCHAR (100) NOT NULL,
	license VARCHAR (100) NOT NULL COMMENT '营业执照'
);

-- 商品表
CREATE TABLE product (
	pid INT auto_increment PRIMARY KEY,
	sName VARCHAR (100) NOT NULL COMMENT '供应商名称',
	pName VARCHAR (100) NOT NULL,
	ptype VARCHAR (100) NOT NULL,
	pPrice DOUBLE NOT NULL COMMENT '即进货成本',
	pNum INT NOT NULL COMMENT '即库存量',
	pDescription VARCHAR (100) NOT NULL COMMENT '商品描述'
);

-- 采购管理表
CREATE TABLE productManage (
	id INT auto_increment PRIMARY KEY,
	pName VARCHAR (100) NOT NULL COMMENT '商品名称',
	username VARCHAR (100) NOT NULL COMMENT '职员姓名',
	inNum INT COMMENT '采购数量',
	outNum INT COMMENT '退货数量'
);

-- 商品销售表
CREATE TABLE sale (
	cid INT auto_increment COMMENT '联合其他表控制合同表',
	pid INT,
	pName VARCHAR (100) NOT NULL COMMENT '商品名称',
	salePrice DOUBLE NOT NULL,
	saleNum INT NOT NULL COMMENT '销售数量',
	username VARCHAR (100) NOT NULL COMMENT '职员姓名',
	CONSTRAINT pid_fk FOREIGN KEY (pid) REFERENCES product (pid),
	PRIMARY KEY (cid, pid)
);

-- 发货表
CREATE TABLE sendProduct (
	id INT auto_increment PRIMARY KEY,
	address VARCHAR (100) NOT NULL COMMENT '收货地址',
	clientName VARCHAR (100) NOT NULL COMMENT '客户姓名 收货人',
	username VARCHAR (100) NOT NULL COMMENT '职员姓名 发货人'
);

-- 商品报价表
CREATE TABLE productQuote (
	pName VARCHAR (100) NOT NULL PRIMARY KEY,
	pType VARCHAR (10) NOT NULL,
	cPrice DOUBLE NOT NULL COMMENT '客户报价',
	sPrice DOUBLE NOT NULL COMMENT '供应商报价',
	dPrice DOUBLE NOT NULL COMMENT '渠道报价'
);

-- 合同表
CREATE TABLE contact (
	cid INT NOT NULL COMMENT '外键来自销售表',
	cName VARCHAR (100) NOT NULL COMMENT '合同名',
	detail VARCHAR (100) NOT NULL COMMENT '订单明细',
	username VARCHAR (100) NOT NULL COMMENT '职员姓名',
	giveaway VARCHAR (100) COMMENT '赠品',
	state VARCHAR (10) DEFAULT '未审核' COMMENT '审核状态',
	checkTime VARCHAR (100) COMMENT '审核时间',
	CONSTRAINT cid_fk FOREIGN KEY (cid) REFERENCES sale (cid)
);

-- 费用管理表
CREATE TABLE costManage (
	costId INT auto_increment PRIMARY KEY,
	username VARCHAR (100) NOT NULL COMMENT '职员姓名',
	income DOUBLE NOT NULL COMMENT '收入',
	outcome DOUBLE NOT NULL COMMENT '支出',
	detail VARCHAR (100) NOT NULL COMMENT '收支明细 即订单统计',
	state VARCHAR (10) DEFAULT '未审核' COMMENT '审核状态'
);

-- 市场活动表
CREATE TABLE marketActivity (
	mid INT auto_increment PRIMARY KEY,
	NAME VARCHAR (100) NOT NULL COMMENT '活动名称',
	time VARCHAR (100) NOT NULL COMMENT '活动时间',
	address VARCHAR (100) NOT NULL,
	gift VARCHAR (100) NOT NULL,
	organizer VARCHAR (100) NOT NULL COMMENT '要检查是否是部门主管',
	partner VARCHAR (100) NOT NULL COMMENT '活动参与者'
);

CREATE TABLE costAnalysis(
    pid int  PRIMARY KEY,
	pName VARCHAR (100) NOT NULL,
	pType VARCHAR (10) NOT NULL,
	cPrice DOUBLE NOT NULL COMMENT '商品表中的成本',
	storePrice DOUBLE NOT NULL COMMENT '仓储费用',
	advicePrice DOUBLE NOT NULL COMMENT '建议出厂价',
	profit DOUBLE NOT NULL COMMENT '预计单件利润'
	CONSTRAINT cosan_pro_fk FOREIGN KEY (pid) REFERENCES product(pid)
);
-- 统计分析
CREATE TABLE statistics (
	pName VARCHAR (100) NOT NULL PRIMARY KEY,
	pType VARCHAR (10) NOT NULL,
	area VARCHAR (100) NOT NULL COMMENT '根据收货区域来',
	num INT NOT NULL COMMENT '使用人数'
);

-- 工作管理
CREATE TABLE workManage (
	theme VARCHAR (100) NOT NULL PRIMARY KEY,
	content VARCHAR (100) NOT NULL,
	time VARCHAR (100) NOT NULL,
	username VARCHAR (100) NOT NULL
);

-- 日程管理
CREATE TABLE plan (
	content VARCHAR (100) NOT NULL PRIMARY KEY,
	username1 VARCHAR (100) NOT NULL COMMENT '普通职员',
	username2 VARCHAR (100) NOT NULL COMMENT '部门主管 即后台写代码进行约束'
);

-- 文件中心
CREATE TABLE fileCenter (
	id INT auto_increment PRIMARY KEY,
	fileName VARCHAR (100) NOT NULL,
	description VARCHAR (100) NOT NULL,
	date VARCHAR (100) NOT NULL,
	uri VARCHAR (100) NOT NULL
);

-- --通讯录
CREATE TABLE addressBook (
	NAME VARCHAR (100) NOT NULL,
	phone VARCHAR (100) NOT NULL,
	address VARCHAR (100) NOT NULL
);

-- 公告栏
CREATE TABLE bulletinBoard (
	theme VARCHAR (100) PRIMARY KEY,
	content VARCHAR (100) NOT NULL,
	releaseDate VARCHAR (100) NOT NULL
);

-- 邮件管理
CREATE TABLE emailManage (
	id INT auto_increment PRIMARY KEY,
	username VARCHAR (100) NOT NULL,
	receiveMan VARCHAR (100) NOT NULL,
	content VARCHAR (100) NOT NULL
);

-- 来电管理
drop  table inCallManage;
CREATE TABLE inCallManage(
 id INT auto_increment PRIMARY KEY,
 sName VARCHAR(100) not null COMMENT '供应商名称后台约束',
 content VARCHAR(100) NOT NULL
);

-- 渠道管理
CREATE TABLE channelManage(
  sName VARCHAR (100) PRIMARY KEY COMMENT '唯一,弹出框下拉列表对象添加',
  way VARCHAR(100) NOT NULL COMMENT '渠道方式',
  username VARCHAR(100) NOT NULL COMMENT '供销部职员 下拉选'
);