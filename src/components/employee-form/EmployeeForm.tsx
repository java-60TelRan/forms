import React, {  useState } from 'react'
import Employee from '../../model/Employee';
import './EmployeeForm.css'
import { useForm } from 'react-hook-form';
interface Props {
    submitter: (empl: Employee) => void;
}
const EmployeeForm: React.FC<Props> = ({submitter}) => {
   const {register, formState, handleSubmit, reset}  = useForm<Employee>();
   const [isDevelopment, setIsDevelopment] = useState<boolean>(false)
//    const formElem = document.querySelector("form") as HTMLFormElement; it's unaccepted
 //  const formRef = useRef<HTMLFormElement>(null);

  return <form  className="ms-5"onSubmit={handleSubmit(data => {
     submitter(data)
     reset()
     })} onReset={() => setIsDevelopment(false)}>
       <div className=" form-floating mb-3">
         
          <input id="name" className="form-control" {...register("name",{required:true, minLength: 3, maxLength: 10})} type='text' placeholder='Enter name'/>
          <label htmlFor="name" >Enter Name</label>
          </div>
       { formState.errors?.name?.type === 'required' && <p className="error form-text">Field name must be filled</p>}
       { formState.errors?.name?.type === 'minLength' && <p className="error form-text">name must have at least 3 symbols</p>}
       <div className="form-floating mb-3">
          
          <input id="salary" className="form-control" type="number" {...register("salary", {required:true, min: 5000, max: 50000})} placeholder='Enter salary'/>
          <label htmlFor="" > Enter Salary</label>
          </div>
       { formState.errors?.salary?.type === 'required' && <p className="error">salary should be entered</p>}
       { formState.errors?.salary?.type === 'min' && <p className="error form-text">minimal salary is 5000</p>}
       { formState.errors?.salary?.type === 'max' && <p className="error form-text">maximal salary is 50000</p>}
       <div className="mb-3">
            <select className="form-select" {...register("department", {required:true, onChange: (event) => {
               setIsDevelopment(event.target.value === "Development")
                  }})}>
       
            <option value="">--Select Department--</option>
            <option value="Development">Development</option>
            <option value="QA">QA</option>
            <option value="Management">Management</option>
       </select>
       </div>
       { formState.errors?.department?.type === 'required' && <p className="error form-text">department should be selected</p>}
      {isDevelopment && <select className="mb-3 form-select" {...register("languages")} multiple>
          <option value="">--Select Languages--</option>
          <option value="C++">C++</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
       </select>}
       <div className="mb-3 d-flex justify-content-around">
         <button type="submit" className="btn btn-primary">Submit</button>
         <button type="reset"  className="btn btn-primary">Reset</button>
       </div>
  </form>
}

export default EmployeeForm