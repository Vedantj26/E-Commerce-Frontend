import axios from "axios";
import { Config } from "../Config/config";

export const client = axios.create({ baseURL: Config.BASE_URL });
