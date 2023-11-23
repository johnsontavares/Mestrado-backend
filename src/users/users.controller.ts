import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { Request, Response} from "express"
import { JwtAuthGuard } from "src/authentication/auth.guard";


@Controller("users")
export class UsersController{
    constructor(private readonly userService: UserService){}

    @Get()
    // @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
        try{
            const result = await this.userService.getAllUser();

            return response.status(200).json({
                status: "OK!",
                message: "Successfully fetch data!",
                result: result

            })
        }catch(err){
            return response.status(500).json({
                status: "OK!",
                message: "Internal Server Error",
            })
        }
    }

}