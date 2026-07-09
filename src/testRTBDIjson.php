<?php

// bootstrap for file location
require_once('../ESBLocationClass.inc');
$mylocation = new Location();

require_once("H:\inetpub\lib\ESB\\".$mylocation->path."\\DICOM\DCMutils.inc");
require_once("H:\inetpub\lib\ESB\\".$mylocation->path."\\DICOM\DCMfileio.inc");
require_once("H:\inetpub\lib\ESB\\".$mylocation->path."\\DICOM\\RTBDI.inc");

$rtbdi = new DICOMrtbdi();
//Jing testing
// $sopinstanceuid = "1.3.6.1.4.1.16517.15.11.11.5692.92548.2025919194236111";
$sopinstanceuid = "1.3.6.1.4.1.16517.15.11.11.5692.48776.2025423201031897";
// $seriesuid = "1.3.6.1.4.1.16517.15.11.11.5692.60293.2025919194236110";
$seriesuid = "1.3.6.1.4.1.16517.15.11.11.5692.91991.2025423201031896";

$obj = $rtbdi->openDCMobjRTDBI($sopinstanceuid,$seriesuid);
echo json_encode($obj);
/*
foreach ($obj as $key => $value) {
    echo "key is " .  $key . ": value is " . $value . "\n";
}
    */
/*
print "<pre>";
print_r($obj);
print "</pre>";
*/
?>