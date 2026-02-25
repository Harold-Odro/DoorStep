<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\StaffResource;
use App\Models\Staff;
use Illuminate\Http\Request;

class AdminStaffController extends Controller
{
    public function index()
    {
        return StaffResource::collection(Staff::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:staff',
            'phone' => 'required|string|max:20',
            'is_active' => 'boolean',
        ]);

        $staff = Staff::create($validated);
        return new StaffResource($staff);
    }

    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:staff,email,' . $staff->id,
            'phone' => 'sometimes|string|max:20',
            'is_active' => 'boolean',
        ]);

        $staff->update($validated);
        return new StaffResource($staff);
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();
        return response()->json(['message' => 'Staff member deleted successfully.']);
    }
}
