<?php
    require_once '../../resources/app_config.php';
    use resources\library\AppUtility;
    use resources\library\DBUtility;

    $appUtil = new AppUtility();
    $conn = new DBUtility($appUtil->GetDBMainStr());
    
    try {

        if(!empty($_POST)){
            $SqlText = 'MERGE Subscribers TARG
                USING (VALUES (?)) AS SRC (Email)
                ON TARG.Email = SRC.Email
                WHEN MATCHED THEN
                    UPDATE SET TARG.dUpdated = SYSDATETIME()
                WHEN NOT MATCHED THEN
                    INSERT (Email,dCreated) VALUES (SRC.Email,SYSDATETIME())
                OUTPUT  inserted.*,$action;
            ';
            $SqlParams = array($_POST['txtEmail']);
            $dataSet = $conn->ExecuteDataQuery($SqlText, $SqlParams);
            if(!$dataSet){
                throw new Exception("Data not saved", 1);
            }else{
                echo json_encode(array("msg"=>"Pass"));
                exit();
            }
        } else {
            throw new Exception("Form data not set", 1);
            
        }

    } catch (Exception $ex) {
        http_response_code(400);
        echo json_encode(array("msg"=>"There was an error: " . $ex->getMessage()));
        exit();
    }
?>