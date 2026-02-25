<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'service' => new ServiceResource($this->whenLoaded('service')),
            'staff' => new StaffResource($this->whenLoaded('staff')),
            'booking_date' => $this->booking_date->format('Y-m-d'),
            'booking_time' => $this->booking_time,
            'address' => $this->address,
            'status' => $this->status,
            'notes' => $this->notes,
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
