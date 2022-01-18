import { useState } from "react";

export default function useForm(props){
    const [form, setForm] = useState(props ? {
        ...props
    } : {})

    const onChangeHandler = (e) => {
        setForm({
            ...form,
          [e.target.name]: e.target.value
          });
      };

      return {form, onChangeHandler }
}