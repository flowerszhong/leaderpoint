<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

date_default_timezone_set('Asia/Shanghai');

function sendemail($email,$name,$msg)
{
    $mail = new PHPMailer();
    $mail->CharSet = "UTF-8";
    $body = "客户新消息<br>"; //设置smtp参数 
    $body .= "<b>姓名: </b>";
    $body .= $name .'<br>';
    $body .= "<b>邮箱: </b>";
    $body .= $email .'<br>';
    $body .= "<b>内容: </b>";
    $body .= $msg .'<br>';
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPKeepAlive = true;
    $mail->Host = "smtp.163.com";
    $mail->Port = 25; 
    //填写你的email账号和密码 
    $mail->Username = "srxhzyh@163.com";
    $mail->Password = "lp163mail";#注意这里要填写授权码就是我在上面网易邮箱开启SMTP中提到的，不能填邮箱登录的密码哦。 
     //设置发送方，最好不要伪造地址 
    $mail->From = "srxhzyh@163.com";
    $mail->FromName = "领博邮件客户端";
    $mail->Subject = "客户[". $name ."]发来消息";
    $mail->AltBody = $body;
    $mail->WordWrap = 80; // set word wrap
    $mail->MsgHTML($body); 
    //设置回复地址
    $mail->AddReplyTo($email, $name); 
    //添加附件，此处附件与脚本位于相同目录下否则填写完整路径 
    //附件的话我就注释掉了 
    #$mail->AddAttachment("attachment.jpg"); 
    #$mail->AddAttachment("attachment.zip"); 
    //设置邮件接收方的邮箱和姓名
    $mail->AddAddress("327261136@qq.com", "leaderpoint"); 
    //使用HTML格式发送邮件
    $mail->IsHTML(true); 
    //通过Send方法发送邮件
    //根据发送结果做相应处理 
    $result = array();
    if (!$mail->Send()) {
        $result['ok'] = false;
        $result['info'] = $mail->ErrorInfo;
        echo json_encode($result);
    }
    else {
        $result['ok'] = true;
        echo json_encode($result);
    }
}

if($_POST['msg'] and $_POST['name'] and $_POST['email']){
    $msg = $_POST['msg'];
    $msg = preg_replace("/[\n\r]/","",$msg);
    $email = $_POST['email'];
    $name = $_POST['name'];
    sendemail($email,$name,$msg);

}else{
    $result = array();
    $result['ok'] = false;
    $result['info'] = "请重新填写表单";
    echo json_encode($result);
}
    
