import redis.asyncio as redis
from app.core.config import settings
import json
from typing import Optional


class RedisClient:
    _instance: Optional[redis.Redis] = None
    
    @classmethod
    async def get_client(cls) -> redis.Redis:
        if cls._instance is None:
            cls._instance = await redis.from_url(
                settings.REDIS_URL,
                encoding="utf-8",
                decode_responses=True
            )
        return cls._instance
    
    @classmethod
    async def close(cls):
        if cls._instance:
            await cls._instance.close()
            cls._instance = None


async def get_redis() -> redis.Redis:
    """Dependency to get Redis client"""
    return await RedisClient.get_client()






