<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';




function sendemail($email,$name,$msg)
{
    $mail = new PHPMailer();
    $mail->CharSet = "UTF-8";
    $body = "<h1>客户新留言</h1>"; //设置smtp参数 
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
    $mail->FromName = "Matthew";
    $mail->Subject = "张学友发来的一封邮件";
    $mail->AltBody = $body;
    $mail->WordWrap = 50; // set word wrap
    $mail->MsgHTML($body); //设置回复地址
    $mail->AddReplyTo("183226875@163.com", "张学友"); 
    //添加附件，此处附件与脚本位于相同目录下否则填写完整路径 
    //附件的话我就注释掉了 
    #$mail->AddAttachment("attachment.jpg"); 
    #$mail->AddAttachment("attachment.zip"); 
    //设置邮件接收方的邮箱和姓名
    $mail->AddAddress("327261136@qq.com", "leaderpoint"); 
    //使用HTML格式发送邮件
    $mail->IsHTML(true); //通过Send方法发送邮件
    //根据发送结果做相应处理 
    if (!$mail->Send()) {
        echo "Mailer Error:" . $mail->ErrorInfo;
    }
    else {
        echo "Message has been sent";
    }
}

if($_POST['msg'] and $_POST['name'] and $_POST['email']){
    $msg = $_POST['msg'];
    $email = $_POST['email'];
    $name = $_POST['name'];

    sendemail($email,$name,$msg);

}else{
    echo "请重新填写表单";
}
    
