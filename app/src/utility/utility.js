import Swal from "sweetalert2";

export default function errorSender(title, des){
    Swal.fire({
    title: title,
    text: des,
    icon: title,
    confirmButtonText: 'close'
    })
}