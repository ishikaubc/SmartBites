from supabase import create_client, Client

SUPABASE_URL = 'https://xnfdhvtpulfyldqlyvel.supabase.co/'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZmRodnRwdWxmeWxkcWx5dmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNjIwODAsImV4cCI6MjA0NzkzODA4MH0.sAIGWof7P58i2FZ-U9ORL1QHmPzr0O9BRknfHIEqBDU'

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
# results = supabase.table('users').select('*').execute()
# print(results)


def update_user_points(user_id: int, points_to_add: int):
    current_user = supabase.table('wallet').select(
        'total_points').eq('id', user_id).single().execute()
    return current_user
    # if current_user.status_code == 200 and current_user.data:
    #     current_points = current_user.data["total_points"]
    #     new_points = current_points + points_to_add
    #     res = supabase.table('wallet').update(
    #         {"total_points": new_points}).eq("id", user_id).execute()
    #     if res.status_code == 200:
    #         return {"message": "Points updated successfully", "user_id": user_id, "new_total_points": new_points}
    #     else:
    #         return {"message": "Failed to update points", "error": res.error}
    # else:
    #     return {"message": "User not found"}



print(update_user_points(244, 22))