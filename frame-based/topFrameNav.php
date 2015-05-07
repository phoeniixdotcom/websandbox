<html>

<head>
<title>CSA Developer Sandbox Menu</title>
<link href="main.css" rel="stylesheet" type="text/css" media="all">
<!--Include YUI Loader: --> 
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/yuiloader/yuiloader-min.js"></script>
 
<!--Use YUI Loader to bring in your other dependencies: --> 
<script type="text/javascript"> 
// Instantiate and configure YUI Loader: 
(function() { 
    var loader = new YAHOO.util.YUILoader({ 
        base: "", 
        require: ["event"], 
        loadOptional: false, 
        combine: true, 
        filter: "MIN", 
        allowRollup: true, 
        onSuccess: function() {
		YAHOO.util.Event.onDOMReady(function(){AjaxTooltip.sendRequest("/jsp/definitions.xml");},"Definitions retrieved."); 
		YAHOO.util.Event.addListener(parent.frames['mainFrame'].document.body, "load", alert(parent.frames['mainFrame'].document.location.href), true)
        } 
    }); 
 
// Load the files using the insert() method. document.getElementById("url").value=parent.mainFrame.location.href document.detailForm.a.value = parent.frameA.location.href;

loader.insert(); 
})(); 
</script>
</head>

<body>

<h1><a href="http://newzealand/devtools/"/>CSA Developer Sandbox</a></h1>

<div>
<input name="url" id="url" />
</div>

<dl>
<dt>Local</dt>
<dd><a href="/cacti/index.php" target="mainFrame">Dev Cacti</a></dd>
<dd><a href="/wiki/index.php/Main_Page" target="mainFrame" onClick="document.getElementById('url').value=this.href">Dev Wiki</a></dd>
<dd><a href="http://tuiris2wiki/" target="mainFrame" onClick="document.getElementById('url').value=this.href">TU IRIS2 Wiki</a></dd>
<dd><a href="http://iris2wiki/" target="mainFrame" onClick="document.getElementById('url').value=this.href">IRIS2 Wiki</a></dd>
<dd><a href="http://itwiki/" target="mainFrame" onClick="document.getElementById('url').value=this.href">IT Wiki</a></dd>
<dd><a href="https://newzealand:88/" target="mainFrame" onClick="document.getElementById('url').value=this.href">Newzealand Webmin</a></dd>
<dd><a href="http://newzealand/repository/maven2/" target="mainFrame" onClick="document.getElementById('url').value=this.href">Maven 2 Repo</a></dd>
<dd><a href="http://newzealand:10080/FrontPage" target="mainFrame" onClick="document.getElementById('url').value=this.href">Fitnesse</a></dd>
<dd><a href="http://newzealand.travelsecure.local/projects/web-app-parent/csa/source-repository.html" target="mainFrame" onClick="document.getElementById('url').value=this.href">Web JavaDocs</a></dd>
</dl>

<dl>
<dt>Services</dt>
<dd><a href="../admin/webservices/showlogsprod.php" target="mainFrame" onClick="document.getElementById('url').value=this.href">Production Service Log</a></dd>
<dd><a href="../admin/webservices/showlogsstag.php" target="mainFrame" onClick="document.getElementById('url').value=this.href">Staging Service Log</a></dd>
<dd><a href="http://finlanddev:8080/" target="mainFrame">Jboss Control Panel (FinlandDev)</a></dd>
<dd><a href="http://finlanddev:8080/notifier" target="mainFrame">CSA Notifier Control Panel (FinlandDev)</a></dd>
<dd><a href="http://finland:8080/" target="mainFrame">Jboss Control Panel (Finland)</a></dd>
<dd><a href="http://finland:8080/notifier" target="mainFrame">CSA Notifier Control Panel (Finland)</a></dd>
</dl>

<dl>
<dt>Misc</dt>
<dd><a href="http://alfresco:10080/alfresco/" target="mainFrame">Alfresco Production</a></dd>
<dd><a href="http://developer.yahoo.com/yui/articles/hosting/?autocomplete&MIN" target="mainFrame">YUI Dep Config</a></dd>
</dl>

</body>

</html>