using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CustomMVCIdentity.Models
{
    public class AdminDB
    {
        private SqlConnection con_AdminDB;
        private void connection()
        {
            string constring_AdminDB = ConfigurationManager.ConnectionStrings["DBConnectionString"].ToString();
            con_AdminDB = new SqlConnection(constring_AdminDB);
        }

        public List<Page2Objs> GetPage2Objs(string Id)
        {
            connection();
            List<Page2Objs> Page2ObjsList = new List<Page2Objs>();

            SqlCommand cmd = new SqlCommand("usp_GetParams", con_AdminDB);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", Id);
            SqlDataAdapter sd = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            con_AdminDB.Open();
            sd.Fill(dt);
            con_AdminDB.Close();

            foreach (DataRow dr in dt.Rows)
            {
                Page2ObjsList.Add(
                    new Page2Objs
                    {
                        ATT1 = (dr["ATT1"]).ToString(),
                        ATT2 = (dr["ATT2"]).ToString(),
                        ATT3 = (dr["ATT3"]).ToString(),
                        ATT4 = (dr["ATT4"]).ToString(),
                        ATT26 = (dr["ATT26"]).ToString(),
                        ATT5 = (dr["ATT5"]).ToString(),
                        ATT6 = (dr["ATT6"]).ToString(),
                        ATT7 = (dr["ATT7"]).ToString(),
                        ATT8 = (dr["ATT8"]).ToString(),
                        ATT9 = (dr["ATT9"]).ToString(),
                        ATT10 = (dr["ATT10"]).ToString(),
                        ATT11 = (dr["ATT11"]).ToString(),
                        ATT12 = (dr["ATT12"]).ToString(),
                        ATT13 = (dr["ATT13"]).ToString(),
                        ATT14 = (dr["ATT14"]).ToString(),
                        ATT15 = (dr["ATT15"]).ToString(),
                        ATT16 = (dr["ATT16"]).ToString(),
                        ATT17 = (dr["ATT17"]).ToString(),
                        ATT18 = (dr["ATT18"]).ToString(),
                        ATT19 = (dr["ATT19"]).ToString(),
                        ATT20 = (dr["ATT20"]).ToString(),
                        ATT21 = (dr["ATT21"]).ToString(),
                        ATT22 = (dr["ATT22"]).ToString(),
                        ATT23 = (dr["ATT23"]).ToString(),
                        ATT24 = (dr["ATT24"]).ToString(),
                        ATT25 = (dr["ATT25"]).ToString(),
                    });
            }
            return Page2ObjsList;
        }

        public List<Page3Objs> GetPage3Objs(string Id)
        {
            connection();
            List<Page3Objs> Page3ObjsList = new List<Page3Objs>();

            SqlCommand cmd = new SqlCommand("usp_GetParams", con_AdminDB);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", Id);
            SqlDataAdapter sd = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            con_AdminDB.Open();
            sd.Fill(dt);
            con_AdminDB.Close();

            foreach (DataRow dr in dt.Rows)
            {
                Page3ObjsList.Add(
                    new Page3Objs
                    {
                        ABS1_1 = (dr["ABS1_1"]).ToString(),
                        ABS1_2 = (dr["ABS1_2"]).ToString(),
                        ABS1_3 = (dr["ABS1_3"]).ToString(),
                        ABS2_1 = (dr["ABS2_1"]).ToString(),
                        ABS2_2 = (dr["ABS2_2"]).ToString(),
                        ABS2_3 = (dr["ABS2_3"]).ToString(),
                        ABS3_1 = (dr["ABS3_1"]).ToString(),
                        ABS3_2 = (dr["ABS3_2"]).ToString(),
                        ABS3_3 = (dr["ABS3_3"]).ToString(),
                        ABS4_1 = (dr["ABS4_1"]).ToString(),
                        ABS4_2 = (dr["ABS4_2"]).ToString(),
                        ABS4_3 = (dr["ABS4_3"]).ToString(),
                        ABS5_1 = (dr["ABS5_1"]).ToString(),
                        ABS5_2 = (dr["ABS5_2"]).ToString(),
                        ABS5_3 = (dr["ABS5_3"]).ToString(),
                        ABS6_1 = (dr["ABS6_1"]).ToString(),
                        ABS6_2 = (dr["ABS6_2"]).ToString(),
                        ABS7_1 = (dr["ABS7_1"]).ToString(),
                        ABS7_2 = (dr["ABS7_2"]).ToString(),
                        ABS8_1 = (dr["ABS8_1"]).ToString(),
                    });
            }
            return Page3ObjsList;
        }

        public bool CheckUserId(string id)
        {
            connection();
            SqlCommand cmd = new SqlCommand("usp_CheckUserId", con_AdminDB);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ID", id);

            SqlDataAdapter sd = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            con_AdminDB.Open();
            sd.Fill(dt);
            con_AdminDB.Close();

            int count = 0;

            if (count < 1)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    count++;
                }
            }

            if (count >= 1)
                return true;
            else
                return false;
        }

        public bool InertUserId(string id)
        {
            connection();
            SqlCommand cmd = new SqlCommand("usp_InsertUserId", con_AdminDB);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ID", id);

            con_AdminDB.Open();
            int i = cmd.ExecuteNonQuery();
            con_AdminDB.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        public bool SavePage2(string id, Page2Objs getParams)
        {
            connection();
            SqlCommand cmd = new SqlCommand("usp_SavePage2", con_AdminDB);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ID", id);
            cmd.Parameters.AddWithValue("@ATT1", getParams.ATT1 != null ? getParams.ATT1 : "0");
            cmd.Parameters.AddWithValue("@ATT2", getParams.ATT2 != null ? getParams.ATT2 : "0");
            cmd.Parameters.AddWithValue("@ATT3", getParams.ATT3 != null ? getParams.ATT3 : "0");
            cmd.Parameters.AddWithValue("@ATT4", getParams.ATT4 != null ? getParams.ATT4 : "0");
            cmd.Parameters.AddWithValue("@ATT5", getParams.ATT5 != null ? getParams.ATT5 : "0");
            cmd.Parameters.AddWithValue("@ATT6", getParams.ATT6 != null ? getParams.ATT6 : "0");
            cmd.Parameters.AddWithValue("@ATT7", getParams.ATT7 != null ? getParams.ATT7 : "0");
            cmd.Parameters.AddWithValue("@ATT8", getParams.ATT8 != null ? getParams.ATT8 : "0");
            cmd.Parameters.AddWithValue("@ATT9", getParams.ATT9 != null ? getParams.ATT9 : "0");
            cmd.Parameters.AddWithValue("@ATT10", getParams.ATT10 != null ? getParams.ATT10 : "0");
            cmd.Parameters.AddWithValue("@ATT11", getParams.ATT11 != null ? getParams.ATT11 : "0");
            cmd.Parameters.AddWithValue("@ATT12", getParams.ATT12 != null ? getParams.ATT12 : "0");
            cmd.Parameters.AddWithValue("@ATT13", getParams.ATT13 != null ? getParams.ATT13 : "0");
            cmd.Parameters.AddWithValue("@ATT14", getParams.ATT14 != null ? getParams.ATT14 : "0");
            cmd.Parameters.AddWithValue("@ATT15", getParams.ATT15 != null ? getParams.ATT15 : "0");
            cmd.Parameters.AddWithValue("@ATT16", getParams.ATT16 != null ? getParams.ATT16 : "0");
            cmd.Parameters.AddWithValue("@ATT17", getParams.ATT17 != null ? getParams.ATT17 : "0");
            cmd.Parameters.AddWithValue("@ATT18", getParams.ATT18 != null ? getParams.ATT18 : "0");
            cmd.Parameters.AddWithValue("@ATT19", getParams.ATT19 != null ? getParams.ATT19 : "0");
            cmd.Parameters.AddWithValue("@ATT20", getParams.ATT20 != null ? getParams.ATT20 : "0");
            cmd.Parameters.AddWithValue("@ATT21", getParams.ATT21 != null ? getParams.ATT21 : "0");
            cmd.Parameters.AddWithValue("@ATT22", getParams.ATT22 != null ? getParams.ATT22 : "0");
            cmd.Parameters.AddWithValue("@ATT23", getParams.ATT23 != null ? getParams.ATT23 : "0");
            cmd.Parameters.AddWithValue("@ATT24", getParams.ATT24 != null ? getParams.ATT24 : "0");
            cmd.Parameters.AddWithValue("@ATT25", getParams.ATT25 != null ? getParams.ATT25 : "0");
            cmd.Parameters.AddWithValue("@ATT26", getParams.ATT26 != null ? getParams.ATT26 : "0");

            con_AdminDB.Open();
            int i = cmd.ExecuteNonQuery();
            con_AdminDB.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        public bool SavePage3(string id, Page3Objs getParams)
        {
            connection();
            SqlCommand cmd = new SqlCommand("usp_SavePage3", con_AdminDB);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ID", id);
            cmd.Parameters.AddWithValue("@ABS1_1", getParams.ABS1_1 != null ? getParams.ABS1_1 : "0");
            cmd.Parameters.AddWithValue("@ABS1_2", getParams.ABS1_2 != null ? getParams.ABS1_2 : "0");
            cmd.Parameters.AddWithValue("@ABS1_3", getParams.ABS1_3 != null ? getParams.ABS1_3 : "0");
            cmd.Parameters.AddWithValue("@ABS2_1", getParams.ABS2_1 != null ? getParams.ABS2_1 : "0");
            cmd.Parameters.AddWithValue("@ABS2_2", getParams.ABS2_2 != null ? getParams.ABS2_2 : "0");
            cmd.Parameters.AddWithValue("@ABS2_3", getParams.ABS2_3 != null ? getParams.ABS2_3 : "0");
            cmd.Parameters.AddWithValue("@ABS3_1", getParams.ABS3_1 != null ? getParams.ABS3_1 : "0");
            cmd.Parameters.AddWithValue("@ABS3_2", getParams.ABS3_2 != null ? getParams.ABS3_2 : "0");
            cmd.Parameters.AddWithValue("@ABS3_3", getParams.ABS3_3 != null ? getParams.ABS3_3 : "0");
            cmd.Parameters.AddWithValue("@ABS4_1", getParams.ABS4_1 != null ? getParams.ABS4_1 : "0");
            cmd.Parameters.AddWithValue("@ABS4_2", getParams.ABS4_2 != null ? getParams.ABS4_2 : "0");
            cmd.Parameters.AddWithValue("@ABS4_3", getParams.ABS4_3 != null ? getParams.ABS4_3 : "0");
            cmd.Parameters.AddWithValue("@ABS5_1", getParams.ABS5_1 != null ? getParams.ABS5_1 : "0");
            cmd.Parameters.AddWithValue("@ABS5_2", getParams.ABS5_2 != null ? getParams.ABS5_2 : "0");
            cmd.Parameters.AddWithValue("@ABS5_3", getParams.ABS5_3 != null ? getParams.ABS5_3 : "0");
            cmd.Parameters.AddWithValue("@ABS6_1", getParams.ABS6_1 != null ? getParams.ABS6_1 : "0");
            cmd.Parameters.AddWithValue("@ABS6_2", getParams.ABS6_2 != null ? getParams.ABS6_2 : "0");
            cmd.Parameters.AddWithValue("@ABS7_1", getParams.ABS7_1 != null ? getParams.ABS7_1 : "0");
            cmd.Parameters.AddWithValue("@ABS7_2", getParams.ABS7_2 != null ? getParams.ABS7_2 : "0");
            cmd.Parameters.AddWithValue("@ABS8_1", getParams.ABS8_1 != null ? getParams.ABS8_1 : "0");


            con_AdminDB.Open();
            int i = cmd.ExecuteNonQuery();
            con_AdminDB.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

    }
}