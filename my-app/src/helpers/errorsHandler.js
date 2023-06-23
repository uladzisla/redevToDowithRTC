import { v4 as uuidv4 } from "uuid";

export default function errorsHandler(errors) {
  let myuuid = uuidv4();

  return typeof errors == "string" ? (
    <p>{errors}</p>
  ) : (
    errors?.map((error) => <p key={myuuid}>{error.msg} </p>)
  );
}
