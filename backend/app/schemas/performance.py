from pydantic import BaseModel
from uuid import UUID
from typing import List


class PerformanceSummaryOut(BaseModel):
    title: str
    value: str
    subtitle: str
    color: str


class StudentPerformanceOut(BaseModel):
    name: str
    completed: str
    score: float
    attention: int
    working: int
    mastered: int
