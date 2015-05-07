<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>CSA Developer Sandbox</title>
<link href="main.css" rel="stylesheet" type="text/css" media="all">
</head>
<script type="text/javascript">
var frameId=document.getElementById('bodyFrame');
</script>
<!--<frameset rows="90,*" frameborder="yes" border="1" framespacing="0">
    <frame src="topFrameNav.php" name="topFrame" frameborder="yes" scrolling="No" noresize="noresize" id="topFrame" title="topFrame" />
    <frame src="mainFrame.php" name="mainFrame" frameborder="yes" scrolling="yes" id="mainFrame" title="mainFrame" />
</frameset>-->

<body>
<div>
<h1><a href="http://newzealand/devtools/"/>CSA Developer Sandbox</a></h1>

<div>
<input name="url" id="url" />
</div>

<dl>
<dt>Local</dt>
<dd><a href="/cacti/index.php" target="bodyFrame">Dev Cacti</a></dd>
<dd><a href="/wiki/index.php/Main_Page" target="bodyFrame">Dev Wiki</a></dd>
<dd><a href="http://tuiris2wiki/" target="bodyFrame" onclick="frameId.src=this.href; frameId.src=frameId.src; return false;">TU IRIS2 Wiki</a></dd>
<dd><a href="http://iris2wiki/" target="bodyFrame" onclick="frameId.src=this.href; frameId.src=frameId.src; return false;">IRIS2 Wiki</a></dd>
<dd><a href="http://itwiki/" target="bodyFrame" onclick="frameId.src=this.href; frameId.src=frameId.src; return false;">IT Wiki</a></dd>
<dd><a href="https://newzealand:88/" target="bodyFrame" onclick="frameId.src=this.href; frameId.src=frameId.src; return false;">Newzealand Webmin</a></dd>
<dd><a href="http://newzealand/repository/maven2/" target="bodyFrame" onClick="document.getElementById('url').value=this.href">Maven 2 Repo</a></dd>
<dd><a href="http://newzealand:10080/FrontPage" target="bodyFrame" onclick="frameId.src=this.href; frameId.src=frameId.src; return false;">Fitnesse</a></dd>
<dd><a href="http://newzealand.travelsecure.local/projects/web-app-parent/csa/source-repository.html" target="bodyFrame" onclick="frameId.src=this.href; frameId.src=frameId.src; return false;">Web JavaDocs</a></dd>
</dl>

<dl>
<dt>Services</dt>
<dd><a href="../admin/webservices/showlogsprod.php" target="bodyFrame">Production Services Log</a></dd>
<dd><a href="../admin/webservices/showlogsstag.php" target="bodyFrame">Staging Services Log</a></dd>
<dd><a href="http://finlanddev:8080/" target="bodyFrame">Jboss Control Panel (FinlandDev)</a></dd>
<dd><a href="http://finlanddev:8080/notifier" target="bodyFrame">CSA Notifier Control Panel (FinlandDev)</a></dd>
<dd><a href="http://finland:8080/" target="bodyFrame">Jboss Control Panel (Finland)</a></dd>
<dd><a href="http://finland:8080/notifier" target="bodyFrame">CSA Notifier Control Panel (Finland)</a></dd>
</dl>

<dl>
<dt>Misc</dt>
<dd><a href="http://alfresco:10080/alfresco/" target="bodyFrame">Alfresco Production</a></dd>
<dd><a href="http://developer.yahoo.com/yui/" target="bodyFrame">YUI</a></dd>
<dd><a href="http://developer.yahoo.com/yui/articles/hosting/?autocomplete&MIN" target="bodyFrame">YUI Dep Config</a></dd>
</dl>
</div>

<div style="height:94%">
<!--<iframe onload="alert(document.getElementById('bodyFrame').contentWindow.location.href);  document.getElementById('url').value=document.getElementById('bodyFrame').contentWindow.location.href" name="bodyFrame" id="bodyFrame" style="width:99%; height:94%;" src="mainFrame.php" frameborder="1" scrolling="yes">
</iframe>-->
<!-- alert(this.src); -->
<iframe onload="document.getElementById('url').value=this.src" name="bodyFrame" id="bodyFrame" style="width:99%; height:94%;" src="mainFrame.php" frameborder="1" scrolling="yes">
</iframe>
</div>

</body>

</html>